import jsonwebtoken from "jsonwebtoken"
import hashPassword from "../hashPassword.js"
import pkg from "@prisma/client"
const { PrismaClient } = pkg

const prisma = new PrismaClient()

export const userSignIn = async (req, res) => {
  const {
    body: { email, password },
  } = req

  try {
    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    })

    if (!user) {
      res.status(403).send("L'email ou le mot de passe est invalide")

      return
    }

    // eslint-disable-next-line no-unused-vars
    const [passwordHash, passwordSalt] = hashPassword(
      password,
      user.passwordSalt
    )

    if (passwordHash !== user.passwordHash) {
      res.status(403).send("L'email ou le mot de passe est invalide")

      return
    }

    const token = jsonwebtoken.sign(
      {
        payload: {
          userId: user.id,
          userAdmin: user.isAdmin,
          userEmail: user.email,
          userName: user.userName,
        },
      },
      user.passwordSalt,
      {
        expiresIn: "24 hours",
      }
    )

    res.send({
      token: token,
      userAdmin: user.isAdmin,
    })
  } catch (error) {
    res.status(400).send("Problème survenue : " + error)
  }
}

export const userSignUp = async (req, res) => {
  const {
    body: { userName, email, password },
  } = req

  try {
    const [passwordHash, passwordSalt] = hashPassword(password)

    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    })

    if (user) {
      res.status(403).send("L'email est déjà utilisé")

      return
    }

    await prisma.users.create({
      data: {
        userName: userName,
        email: email,
        passwordHash: passwordHash,
        passwordSalt: passwordSalt,
      },
    })

    res.status(200).send("L'utilisateur a bien été créé")
  } catch (error) {
    res.status(400).send("Problème survenue : " + error)
  }
}

export const userSession = async (req, res) => {
  const {
    headers: { authorization },
  } = req

  if (!authorization) {
    return res.status(403).send("no token in the header authorization")
  }

  try {
    const token = jsonwebtoken.decode(authorization)
    const user = await prisma.users.findUnique({
      where: { id: token.payload.userId },
    })

    const userId = token.payload.userId
    const userAdmin = token.payload.userAdmin

    jsonwebtoken.verify(authorization, user.passwordSalt)

    res.status(200).send({
      token: authorization,
      userId: userId,
      userAdmin: userAdmin,
    })
  } catch (err) {
    res.status(403).send("token invalid !")
  }
}

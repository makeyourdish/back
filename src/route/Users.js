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

    // eslint-disable-next-line no-unused-vars
    const [passwordHash, passwordSalt] = hashPassword(
      password,
      user.passwordSalt
    )

    if (passwordHash !== user.passwordHash) {
      res.status(403).send("Email or Password is invalid")

      return
    }

    const token = jsonwebtoken.sign(
      {
        payload: {
          userId: user.id,
          userAdmin: user.isAdmin,
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
    res.status(400).send("Problème survenu : " + error)
  }
}

export const userSignUp = async (req, res) => {
  const {
    body: { userName, email, password, isAdmin },
  } = req

  try {
    const [passwordHash, passwordSalt] = hashPassword(password)

    await prisma.users.create({
      data: {
        userName: userName,
        email: email,
        passwordHash: passwordHash,
        passwordSalt: passwordSalt,
        isAdmin: isAdmin || false,
      },
    })

    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    })

    res.send(user)
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const updateUser = async (req, res) => {
  const {
    body: { userName, email, password, isAdmin },
    params: { idUser },
  } = req

  try {
    let user

    if (password.length) {
      const [passwordHash, passwordSalt] = hashPassword(password)

      user = await prisma.users.update({
        where: { id: parseInt(idUser) },
        data: {
          userName: userName,
          email: email,
          passwordHash: passwordHash,
          passwordSalt: passwordSalt,
          isAdmin: isAdmin || false,
        },
      })

      res.send(user)

      return
    }

    user = await prisma.users.update({
      where: { id: parseInt(idUser) },
      data: {
        userName: userName,
        email: email,
        isAdmin: isAdmin,
      },
    })

    res.send(user)
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({})

    res.status(200).send(users)
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const getUser = async (req, res) => {
  const {
    params: { idUser },
  } = req

  try {
    const users = await prisma.users.findUnique({
      where: { id: parseInt(idUser) },
    })

    res.status(200).send(users)
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const deleteUser = async (req, res) => {
  const {
    params: { idUser },
  } = req

  try {
    const users = await prisma.users.delete({
      where: { id: parseInt(idUser) },
    })

    res.status(200).send({ users: users })
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const userSession = async (req, res) => {
  const {
    headers: { authorization },
  } = req

  if (!authorization) {
    return res.status(403).send("Pas de token dans l'en-tête d'autorisation")
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
    res.status(403).send("Token invalide")
  }
}

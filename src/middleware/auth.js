import jsonwebtoken from "jsonwebtoken"
import pkg from "@prisma/client"
const { PrismaClient } = pkg

const prisma = new PrismaClient()

const auth = async (req, res, next) => {
  const {
    headers: { authorization },
  } = req
  const token = jsonwebtoken.decode(authorization)

  try {
    const user = await prisma.users.findUnique({
      where: { id: token.payload.userId },
    })
    res.userAdmin = token.userAdmin
    jsonwebtoken.verify(authorization, user.passwordSalt)

    next()
  } catch (err) {
    res.status(403).send("Token invalide")
  }
}

export default auth

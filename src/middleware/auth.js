import jsonwebtoken from "jsonwebtoken"
import pkg from "@prisma/client"
const { PrismaClient } = pkg

const prisma = new PrismaClient()

const auth = async (req, res, next) => {
  const {
    headers: { token: jwt },
  } = req

  if (!jwt) {
    res.status(403).send("Unauthorized")

    return
  }

  const token = jsonwebtoken.decode(jwt)

  try {
    const user = await prisma.users.findUnique({
      where: { id: token.payload.userId },
    })
    res.userAdmin = token.userAdmin
    jsonwebtoken.verify(jwt, user.passwordSalt)
    next()
  } catch (err) {
    console.log("token invalid !")
    res.status(403).send("token invalid !")
  }
}

export default auth

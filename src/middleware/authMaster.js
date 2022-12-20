import jsonwebtoken from "jsonwebtoken"
import pkg from "@prisma/client"
const { PrismaClient } = pkg

const prisma = new PrismaClient()

const authMaster = async (req, res, next) => {
  const {
    headers: { token },
  } = req
  const jwt = jsonwebtoken.decode(token)

  try {
    const user = await prisma.users.findUnique({
      where: { id: jwt.payload.userId },
    })
    res.userAdmin = jwt.userAdmin
    jsonwebtoken.verify(token, user.passwordSalt)

    if (user.isAdmin) {
      next()

      return
    }

    res.status(403).send("Utilisateur non administrateur")
  } catch (err) {
    res
      .status(403)
      .send("Session invalide ou expirée, veuillez vous reconnecter")
  }
}

export default authMaster

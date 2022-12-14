import jsonwebtoken from "jsonwebtoken";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const authMaster = async (req, res, next) => {
  const {
    headers: { authorization },
  } = req;
  const token = jsonwebtoken.decode(authorization);

  try {
    const user = await prisma.users.findUnique({
      where: { id: token.payload.userId },
    });
    res.userAdmin = token.userAdmin;
    jsonwebtoken.verify(authorization, user.passwordSalt);
    if (user.isAdmin == true){
next();
    }
    res.status(403).send("Utilisateur non administrateur");
  } catch (err) {
    console.log("token invalid !");
    res.status(403).send("token invalid !");
  }
};

export default authMaster;
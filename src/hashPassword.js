import { pbkdf2Sync, randomBytes } from "crypto"

const hashPassword = (password, salt = randomBytes(1000).toString("hex")) => {
  const passwordHash = pbkdf2Sync(password, salt, 100000, 16, "sha512")

  return [passwordHash.toString("hex"), salt]
}

export default hashPassword

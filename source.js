const { randomBytes, scrypt, timingSafeEqual } = require('crypto')
const { promisify } = require('util')

const scryptAsync = promisify(scrypt)

const encryptPassword = async (password, salt) => {
  const key = await scryptAsync(password, salt, 32)
  return key.toString('hex')
}

const hashPassword = async function (password) {
  const salt = randomBytes(24).toString('hex')
  const hashedPassword = await encryptPassword(password, salt)
  return hashedPassword + salt
}

const comparePassword = async function (password, hashedPassword) {
  const salt = hashedPassword.slice(64)
  const originalPassHash = Buffer.from(hashedPassword.slice(0, 64), 'hex')
  const currentPassHash = Buffer.from(await encryptPassword(password, salt), 'hex')
  return timingSafeEqual(originalPassHash, currentPassHash)
}

module.exports = {
  hashPassword,
  comparePassword
}

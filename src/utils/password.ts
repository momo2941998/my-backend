
import bcrypt from 'bcrypt'
const saltRounds = 10;

export const genPassword = async (password: string) => {
  return bcrypt.hash(password, saltRounds)
}

export const checkPassword =async (password: string, encrypted: string) => {
  return bcrypt.compare(password, encrypted)
}


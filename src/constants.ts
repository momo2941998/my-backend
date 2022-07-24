import dotenv from "dotenv"
dotenv.config()
const defaultUploadDir = "uploads"
let uploadDir = process.env.UPLOAD_DIRECTORY ? process.env.UPLOAD_DIRECTORY : defaultUploadDir

export {
  uploadDir
}
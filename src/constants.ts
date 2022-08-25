import dotenv from "dotenv"
dotenv.config()

const isProductionMode = process.env.NODE_ENV === 'production'
const defaultUploadDir = "uploads"
let uploadDir = process.env.UPLOAD_DIRECTORY ? process.env.UPLOAD_DIRECTORY : defaultUploadDir
let http_port = parseInt(process.env.HTTP_PORT || "80000")

const mongo_uri = process.env.MONGO_URI || ""
export {
  uploadDir,
  isProductionMode,
  http_port,
  mongo_uri
}
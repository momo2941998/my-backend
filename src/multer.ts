import multer from "multer";
import { Request } from "express";
import { v4 } from "uuid";
import fs from 'fs'
import { uploadDir } from "./constants";


if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir , {recursive: true});
}
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    let filename = v4() + '-' + Date.now()
    let endFile = file.originalname.split(".")
    if (endFile) filename+=`.${endFile[endFile.length-1]}`
    cb(null, filename)
  }
})
 
export const uploader = multer({ storage: storage })
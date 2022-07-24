import express, { Request, Response } from 'express'
import { Controller } from '../types/my-module'
import { uploader } from '../multer'


let uploadRouter = express.Router()


uploadRouter.post('/', uploader.single('file'), (req, res, next) => {
  console.log(req.file)
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    return next(error)
  }
  res.send(file)
})

export const uploadController: Controller = {
  path: "/upload",
  router: uploadRouter
}
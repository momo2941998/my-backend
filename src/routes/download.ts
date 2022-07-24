
import express, { Request, Response } from 'express'
import { Controller } from '../types/my-module'
import fs from "fs"
import { uploadDir } from '../constants'

let downloadRouter = express.Router()

downloadRouter.get('/:path', (req, res, next) => {
  let path = req.params.path
  if (!path) return res.status(404).send("Not found")
  const filedir = `${process.cwd()}/${uploadDir}/${path}`;
  if (fs.existsSync(filedir)) {
    return res.download(filedir);
  } else {
    return res.status(404).send("Not found")
  }
})

export const downloadController: Controller = {
  path: "/files",
  router: downloadRouter
}
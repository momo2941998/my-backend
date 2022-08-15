
import express, { Request, Response } from 'express'
import { Controller } from '../types/my-module'
import fs from "fs"
import { uploadDir } from '../constants'
import { unlink } from 'node:fs/promises'
import { logger } from '../logger'

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

downloadRouter.delete('/:path', async (req, res, next)=> {
  let path = req.params.path
  if (!path) return res.status(400).send("No path file")
  let fullPath = `${uploadDir}/${path}`
  if (fs.existsSync(fullPath)) {
    try {
      await unlink(fullPath)
      return res.send("delete successfully!")
    } catch (error) {
      logger.error(error)
      return res.status(500).send("Error in deleting:")
    }
  }
  return res.status(404).send("Not found")
})

export const downloadController: Controller = {
  path: "/files",
  router: downloadRouter
}
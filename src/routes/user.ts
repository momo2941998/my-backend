import express, { Request, Response } from 'express'
import { Controller } from '../types/my-module'

const userRouter = express.Router()
userRouter.get("/", (req: Request, res: Response) => {
  const usersList = [
    {id: 1, name: "Hello"},
    {id: 2, name: "World"}
  ]
  return res.json(usersList)
})

export const userController: Controller = {
  path: "/users",
  router: userRouter
}
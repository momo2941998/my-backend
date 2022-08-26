import express, { Request, Response } from 'express'
import { UserModel } from '../models/user-model'
import { Controller } from '../types/my-module'
import { checkPassword, genPassword } from '../utils/password'
import { makeResponseError } from '../utils/response'

const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
  const {username, email, password } = req.body
  if (!username || !email || !password) {
    return makeResponseError(res)(400, "Invalid params")
  } 
  try {
    let existed = await UserModel.exists({ email: email })
    if (existed) {
      return makeResponseError(res)(400, "Email is existed!")
    }
    let encrypted = await genPassword(password)
    let user = new UserModel({
      name: username,
      email: email,
      password: encrypted
    })
    await user.save()
    console.log(user)
    return res.status(200).send("Success")
  } catch (error) {
    return makeResponseError(res)(500)
  }
})

userRouter.post("/login",async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return makeResponseError(res)(400, "Invalid params")
  } 
  try {
    let userExisted = await UserModel.findOne({ email: email })
    if (!userExisted) return makeResponseError(res)(400, "User is not existed!")
    if (!userExisted.password) return makeResponseError(res)(500, "User invalid!")
    let checked = await checkPassword(password, userExisted.password)
    if (!checked) {
      return makeResponseError(res)(400, "Wrong email/password!")
    } else {
      return res.status(200).json("success")
    }
  } catch (error) {
    return makeResponseError(res)(500)
  }
})

export const userController: Controller = {
  path: "/users",
  router: userRouter
}
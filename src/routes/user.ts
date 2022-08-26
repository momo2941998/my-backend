import express, { Request, Response } from 'express'
import { getAppWithSidAndKey } from '../dao/app'
import { UserModel } from '../models/user-model'
import { Controller } from '../types/my-module'
import { createToken } from '../utils/jwtUtils'
import { checkPassword, genPassword } from '../utils/password'
import { makeResponseError } from '../utils/response'

const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
  const {username, email, password, app_sid, app_key } = req.body
  if (!username || !email || !password || !app_sid ||!app_key) {
    return makeResponseError(res)(400, "Invalid params")
  } 
  try {
    let appInfo = await getAppWithSidAndKey(app_sid, app_key)
    if (!appInfo) return makeResponseError(res)(400, "App sid/App key Invalid")
    let existed = await UserModel.exists({ email: email })
    if (existed) {
      return makeResponseError(res)(400, "Email is existed!")
    }
    let encrypted = await genPassword(password)
    let user = new UserModel({
      name: username,
      email: email,
      password: encrypted,
      app_sid: app_sid,
    })
    await user.save()
    console.log(user)
    return res.status(200).send("Success")
  } catch (error) {
    return makeResponseError(res)(500)
  }
})

userRouter.post("/login",async (req, res) => {
  const { email, password, app_sid, app_key } = req.body
  if (!email || !password || !app_sid ||!app_key) {
    return makeResponseError(res)(400, "Invalid params")
  } 
  try {
    let appInfo = await getAppWithSidAndKey(app_sid, app_key)
    if (!appInfo) return makeResponseError(res)(400, "App sid/App key Invalid")
    let userExisted = await UserModel.findOne({ email: email })
    if (!userExisted) return makeResponseError(res)(400, "User is not existed!")
    if (userExisted.app_sid !== app_sid) return makeResponseError(res)(400, "Not found user in App")
    if (!userExisted.password) return makeResponseError(res)(500, "User invalid!")
    let checked = await checkPassword(password, userExisted.password)
    if (!checked) {
      return makeResponseError(res)(400, "Wrong email/password!")
    } else {
      return res.status(200).json({
        username: userExisted.name,
        email: userExisted.email,
        app_sid: userExisted.app_sid,
        jwt: createToken(app_sid, app_key, userExisted.name)
      })
    }
  } catch (error) {
    return makeResponseError(res)(500)
  }
})

export const userController: Controller = {
  path: "/users",
  router: userRouter
}
import express, { Request, Response } from 'express'
import { logger } from '../logger'
import { MyError } from '../tinode/MyError'
import { Controller } from '../types/my-module'
import { verifyToken } from '../utils/jwtUtils'
import { loginBasic, newAcc, openConnect } from '../websocket/ws'
import Websocket from 'ws'
import { initPacketHi, sendWS } from '../tinode/utils'
const router = express.Router()

router.get("/", async (request: Request, response: Response) => {
  try {
    let jwt = request.headers.jwt as string
    console.log(jwt)
    if (!jwt) {
      return response.status(400).json({
        detail: "not found jwt"
      })
    }
    let result = await verifyToken(jwt)
    if (result[0]) {
      // jwt is checked 
      let userInfo = result[1]
      if (userInfo) {
      let ws = await openConnect()
      let hiMsg = initPacketHi()
      await sendWS(ws, hiMsg, hiMsg.hi.id)
      try {
          try {
            await newAcc(ws, {
              username: userInfo.user_id,
              password: "123456",
              email: 'test@123.com',
              fullname: ''
            })
            return response.status(200).json({
              user_id: userInfo.user_id
            })
          } catch (err) {
            if (err instanceof MyError) {
              if (err.code == "409") {
                return response.status(200).json({
                  user_id: userInfo.user_id
                })
              }
            } else {
              console.log(err)
              return response.status(400).json({
                detail: err
              })
            }
          }
        } catch (error) {
          return response.status(500).json({
            detail: "Cannot connect Tinode"
          })
        } finally {
          ws.close()
        }
      } else {
        return response.status(400).json({
          detail: "Not parse user from jwt"
        })
      }

    } else {
      return response.status(400).json({
        detail: result[2]
      })
    }
  } catch (error) {
    logger.error(error)
    return response.status(500).json({
      detail: "Unknown"
    })
  }
})

export const jwtController: Controller = {
  path: '/jwt',
  router
}
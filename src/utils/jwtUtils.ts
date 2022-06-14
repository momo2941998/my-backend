import jwt, { Jwt, JwtHeader, JwtPayload } from 'jsonwebtoken'
import { logger } from '../logger'
import { appsUtils } from '../redis'
import { Model_App } from '../types/redis'
const myCompany = "MOBIFONE"

interface MyJwtHeader extends JwtHeader {
}

interface MyPayload extends JwtPayload {
  userId: string,
}

interface ReturnUserInfo {
  user_id: string,
}

/**
 * Create jwt token
 * 
 * @param apiKeySid string
 * @param apiKeySecret string
 * @param userId string
 * @returns string
 */
export const createToken = (apiKeySid: string, apiKeySecret: string, userId: string, time_hour: number = 168) => {
  let now = Math.floor(Date.now() /1000)
  let exp = now + 3600 * time_hour
  let header: MyJwtHeader = {
    cty: myCompany,
    alg: 'HS256'
  }
  let payload: MyPayload = {
    jti: apiKeySid + "-" + now,
    iss: apiKeySid,
    exp: exp,
    userId: userId,
  }
  let token = jwt.sign(payload, apiKeySecret, { header: header})
  return token
}

/**
 * verify and return result for next step
 * 
 * @param token string
 * @returns [ isSuccess: boolean, userInfo: Model_User ]
 */
export const verifyToken = async (token: string): Promise<[boolean, ReturnUserInfo | undefined, string]> => {
  try {
    let errorText = ''
    logger.info('start verify token......')
    let decoded = jwt.decode(token, { complete: true })
    // console.log(decoded)
    if (!decoded) throw new Error(`Invalid JWT: cannot decode token`)
    if (!decoded.header && !decoded.payload) throw new Error(`Invalid JWT: cannot read header or payload`)
    let header = decoded.header as MyJwtHeader
    let payload = decoded.payload as MyPayload
    if (header.cty !== myCompany) throw new Error(`Invalid JWT: header.cty`)
    if (!payload.iss || !payload.userId) throw new Error(`Invalid JWT: payload`)
    let api_key_sid = payload.iss
    let appInfo = await appsUtils.getApp(api_key_sid) as Model_App 
    // console.log(appInfo)
    if (!appInfo) throw new Error('not found app')
    if (!appInfo.id) throw new Error('not found id app')
    if (!appInfo.api_key_secret) throw new Error('not found secret key app')
    let result = jwt.verify(token, appInfo.api_key_secret)
    logger.info('token validated')
    return [true, {
      user_id: payload.userId
    }, errorText];
  } catch (error) {
    logger.error(error)
    let errorText = error
    if (error instanceof Error) {
      // console.log(true)
      errorText = error.message
    } 
    return [false, undefined, errorText as string]
  }
}
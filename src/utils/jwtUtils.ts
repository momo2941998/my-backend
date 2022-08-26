import jwt, { Jwt, JwtHeader, JwtPayload } from 'jsonwebtoken'
import { getAppWithSid } from '../dao/app'
import { logger } from '../logger'
import { RequestUser } from '../types'
const myCompany = "MOBIFONE"

interface MyJwtHeader extends JwtHeader {
}

interface MyPayload extends JwtPayload {
  userId: string,
}


export const verifyToken = async (token: string): Promise<[boolean, RequestUser | undefined, string]> => {
  try {
    let errorText = ''
    logger.info('start verify token......')
    let decoded = jwt.decode(token, { complete: true })
    if (!decoded) throw new Error(`Invalid JWT: cannot decode token`)
    if (!decoded.header && !decoded.payload) throw new Error(`Invalid JWT: cannot read header or payload`)
    let header = decoded.header as MyJwtHeader
    let payload = decoded.payload as MyPayload
    if (header.cty !== myCompany) throw new Error(`Invalid JWT: header.cty`)
    if (!payload.iss || !payload.userId) throw new Error(`Invalid JWT: payload`)
    let api_key_sid = payload.iss
    let appInfo = await getAppWithSid(api_key_sid)
    if (!appInfo) throw new Error("Not found App")
    if (!appInfo.key) throw new Error('not found secret key app')
    let result = jwt.verify(token, appInfo.key)
    let userId = payload.userId
    logger.info('token validated')
    return [true, {
      id_user: userId,
      id_app: appInfo.id,
    }, errorText];
  } catch (error) {
    let errorText = error
    if (error instanceof Error) {
      errorText = error.message
    } 
    return [false, undefined, errorText as string]
  }
}

export const createToken = (apiKeySid: string, apiKeySecret: string, userId: string, time_hour: number = 24) => {
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
  let token = jwt.sign(payload, apiKeySecret, { header: header })
  return token
}
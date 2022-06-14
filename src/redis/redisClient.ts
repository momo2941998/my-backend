import Redis from "ioredis"
import dotenv from "dotenv"
dotenv.config()
import { logger } from '../logger'

type StringOrUndefined = string | undefined

const REDIS_HOST: StringOrUndefined = process.env.REDIS_HOST
let REDIS_PORT: number | undefined = undefined
if (process.env.REDIS_PORT) {
  REDIS_PORT = parseInt(process.env.REDIS_PORT)
}
let REDIS_PASSWORD: StringOrUndefined = process.env.REDIS_PASSWORD 
const REDIS_KEYPREFIX: string = process.env.REDIS_KEYPREFIX || ''
const myRedis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  keyPrefix: REDIS_KEYPREFIX,
  password: REDIS_PASSWORD
})

myRedis.connect(() => {
  logger.info(` ---> Connect successfully to redis Server: ${REDIS_HOST}:${REDIS_PORT}`)
})

export const MyRedis = {
  getClient: () => myRedis,
  getKeyName: (keyPrefix: string) => (...args: string[]) => `${keyPrefix}:${args.join(':')}`
}
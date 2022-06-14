import { MyRedis } from "./redisClient";
import { tableList } from "./tableList";
import { logger } from "../logger";
import { RequireFieldPartial } from "../types/my-module";
import { Model_App } from "../types/redis";

const redis = MyRedis.getClient()
const AppTable = MyRedis.getKeyName(tableList.APPS)
const AppInfoPrefix = (app_id: string) => AppTable(app_id)

const getApp = async (app_key_sid: string) => {
  try {
    let jsonResult = await redis.get(AppInfoPrefix(app_key_sid))
    if (!jsonResult) {
      return undefined
    }
    let converted = JSON.parse(jsonResult) as RequireFieldPartial<Model_App, 'id'|'api_key_secret'>
    return {
      ...converted,
      api_key_sid: app_key_sid
    } as Model_App
  } catch (error) {
    logger.error(error)
    throw new Error(`getApp error: ${error}`)
  }
}

export const appsUtils = {
  getApp,
}

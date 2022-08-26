import { AppModel } from "../models/app-model"

export const getAppWithSid = ( sid: string ) => { 
  return AppModel.findOne({ sid })
}

export const getAppWithSidAndKey = ( sid: string, key: string ) => { 
  return AppModel.findOne({ sid, key })
}
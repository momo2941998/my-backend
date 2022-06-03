
import morgan from "morgan";
import path from "path";
import { createStream } from 'rotating-file-stream'
import { Express, NextFunction, Request, Response } from "express";

var accessLogStream = createStream('access.log', {
  interval: '1d',
  path: 'log/'
})

morgan.token('id', (req: Request, res: Response) => {
  return req.id
})

const devLogMiddleware = morgan(':date[iso] :method :url HTTP/:http-version [id]:id :status ')
const combinedLogMiddleware = morgan(':date[iso] :remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', {
  stream: accessLogStream
})

export const morganLogger = {
  devLogMiddleware,
  combinedLogMiddleware
}


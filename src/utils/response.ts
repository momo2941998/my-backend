import { Response } from "express";

export const makeResponseError = (res: Response) => (statusCode: number, errString?: string) => {
  res.status(statusCode).send({
    detail: errString || "Unknown error"
  })
}
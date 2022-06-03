
import { Request, Response, NextFunction } from "express";
import { v4 } from "uuid";

export function assignId (req: Request, res: Response, next: NextFunction) {
  req.id = v4()
  next()
}
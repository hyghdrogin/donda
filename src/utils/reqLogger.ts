import {DateTime} from "luxon";
import {Request, Response, NextFunction} from "express";

const reqLogger = async (req: Request, res: Response, next: NextFunction) => {
  console.info(`request (${DateTime.now().toISO()}): ${req.protocol}://${req.hostname}${req.originalUrl} (${req.method})`)
  return next()
}

export default reqLogger
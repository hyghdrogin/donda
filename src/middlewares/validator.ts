import { Request, Response, NextFunction } from 'express';
import { errorResponse} from "../utils/responses"

const validationMiddleware = (validator: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = validator(req.body);
    if (error) {
      return errorResponse(res, 422, error.details[0].message.split('"').join(''));
    }
    next();
  };
};

export default validationMiddleware;

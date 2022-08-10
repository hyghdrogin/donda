import { Request, Response, NextFunction } from 'express';
import { errorResponse} from "../utils/responses"
import validate from "../utils/validate"

const validationMiddleware = (requestSchema: any, auth = true) => {
  const schema = auth
    ? {
      ...requestSchema,
    }
    : requestSchema;
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = validate(schema, req);
    if (error) {
      return errorResponse(res, 422, error[0]);
    }
    next();
  };
};

export default validationMiddleware;

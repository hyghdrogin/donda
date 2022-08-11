import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/responses";
// import validate from "../utils/validate"
const options = {
  stripUnknown: true,
  abortEarly: false,
  errors: {
    wrap: {
      label: ""
    }
  }
};

const validate = (schemas: any, values: any) => {
  let error = [];
  for (let paramToValidate of Object.keys(schemas)) {
    const value = values[paramToValidate];
    if (value) {
      const schema = schemas[paramToValidate];
      let result = schema.validate(values[paramToValidate], options);
      if (result.error) {
        error.push(
          result.error.details.map(
            (detail:any) => `${detail.message}`
          )
        );
      } else {
        values[paramToValidate] = result.value;
      }
    } else {
      error.push(`${paramToValidate} missing`);
    }
  }
  if (error.length > 0) return { error: error.flat() };
  return {};
};

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

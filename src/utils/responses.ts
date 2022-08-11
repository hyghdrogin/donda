import { Response, Request } from "express";

function errorResponse(
  res: Response,
  statusCode: number,
  error: string,
) {
  const responseObject = { statusCode, error };
  return res.status(statusCode).send(responseObject);
}

function successResponse(
  res: Response,
  statusCode: number,
  message: string,
  data: any = [],
) {
  const responseObject = { statusCode, message, data };
  return res.status(statusCode).send(responseObject);
}

const handleError = (err: any, req: Request) => {
  console.log(`
      Error caught at ${req.path}, 
      Request body: ${JSON.stringify(req.body)},
      Request User: ${JSON.stringify(req.user)},
      Request Params: ${JSON.stringify(req.params)}
      Request Query: ${JSON.stringify(req.query)}
      Error Message: ${JSON.stringify(err.message)}
      Error Logs: ${JSON.stringify(err.stack)}
  }`);
};

export {
  errorResponse,
  successResponse,
  handleError
};

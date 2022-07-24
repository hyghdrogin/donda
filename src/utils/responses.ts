import { Response } from 'express';

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
  const responseObject = {  statusCode, message, data };
  return res.status(statusCode).send(responseObject);
}

export {
  errorResponse,
  successResponse,
};

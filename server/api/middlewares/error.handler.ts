import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line no-unused-vars, no-shadow
export default function errorHandler(
  err,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errStatus = err.status || 500;
  res.status(errStatus);
  res.send(
    JSON.stringify({ error: { status: err.status, message: err.message } })
  );
}

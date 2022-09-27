import { ErrorRequestHandler } from 'express';

const error: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err.status) return res.status(err.status).send({ message: err.message });

  return res.status(500).send({ message: err.message });
};

export default error;

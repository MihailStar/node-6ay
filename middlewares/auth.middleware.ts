import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';

import config from '../config';
import { AccessTokenPayload } from '../utils/generateAccessToken';

function middleware(
  req: Request,
  res: Response<unknown, { accessTokenPayload: AccessTokenPayload }>,
  next: NextFunction
): void {
  try {
    if (req.method === 'OPTIONS') {
      next();
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (token === undefined) {
      res.status(403).json({ message: 'Authorization error' });
      return;
    }

    // TODO: handle jsonwebtoken error 'TokenExpiredError'
    const accessTokenPayload = jsonwebtoken.verify(
      token,
      config.secret
    ) as AccessTokenPayload;

    res.locals.accessTokenPayload = accessTokenPayload;
    next();
  } catch (error) {
    process.stderr.write(`${error}\n`);
    res.status(403).json({ message: 'Authorization error' });
  }
}

export default middleware;

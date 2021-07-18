import express, { Express, Request, Response, NextFunction } from 'express';

import authRouter from './routers/auth.router';

function create(): Express {
  const app = express();

  // TODO: add CORS
  app
    .set('x-powered-by', false)
    .use(express.json())
    .use('/auth', authRouter)
    // for json parser
    .use((error: Error, req: Request, res: Response, next: NextFunction) => {
      process.stderr.write(`${error}\n`);
      res.status(400).json({ message: `${error.name}: ${error.message}` });
    });

  return app;
}

export default create;

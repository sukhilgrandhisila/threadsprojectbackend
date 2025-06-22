import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();
    const requestTime = new Date().toISOString();
    console.log(`[Request] ${req.method} ${req.originalUrl} - at ${requestTime}`);

    res.on('finish', () => {
      const responseTime = new Date().toISOString();
      const duration = Date.now() - start;
      console.log(`[Response] ${req.method} ${req.originalUrl} - at ${responseTime} (Duration: ${duration}ms)`);
    });

    next();
  }
}

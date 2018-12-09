import { Request, Response, NextFunction } from 'express';
import { isDevelopment } from '../constants';


/**
 * Sets Cache Headers for resources
 */
export default function cacheControl(req: Request, res: Response, next: NextFunction) {
  // Don't cache in development
  isDevelopment === true
    ? res.setHeader('Cache-Control', 'no-cache')
    // Cache for 1 Month
    : res.setHeader('Cache-Control', 'public, max-age=2592000');

  // Pass Along
  next();
}

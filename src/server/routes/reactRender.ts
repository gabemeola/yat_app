import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import {
  fsStreamToPromise,
  asyncMiddleware,
} from '../helpers';


// Initialize express Router
const router = express.Router();

/**
 * React Render All "GET" Route
 */
router.get('*', asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
  // If client is Not looking for "text/html"
  // then pass to next Route
  if (req.accepts('html') !== 'html') return next();

  /**
   * Handle writable stream errors.
   */
  res.on('error', (e: Error) => {
    // Log out Error has occurred.
    console.error(
      'Error Occurred while streaming response to client: \n',
      e
    );
    // End the Stream.
    res.end();
  });

  // Set the Content-Type to HMTL
  res.set('Content-Type', 'text/html');

  // Send down html file
  await fsStreamToPromise(
    path.join(__dirname, '..', 'public', 'index.html'),
    res
  );

  return res.end();
}));


// Export Router Object
export default router;

import express from 'express';

/**
 * Returns 404 Not Found for now.
 * TODO: Return a static 404 page
 */
export default function notFound(req: express.Request, res: express.Response) {
  res.sendStatus(404);
}

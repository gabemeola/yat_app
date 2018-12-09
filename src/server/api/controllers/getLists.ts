import { Request, Response } from 'express';
import store from './helpers/store';

export default function getLists(req: Request, res: Response) {
  res.status(200).send(store.keys());
}

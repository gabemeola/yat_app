import { Request, Response } from 'express';
import store from './helpers/store';

interface Req extends Request {
  params: {
    listName?: string,
  }
}

export default function removeList(req: Req, res: Response) {
  const { listName } = req.params;
  if (!listName) {
    res.status(400).send('listName param is required');
    return;
  }

  store.remove(listName)
  res.status(200).send();
}

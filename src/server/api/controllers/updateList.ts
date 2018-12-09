import { Request, Response } from 'express';
import store from './helpers/store';

interface Req extends Request {
  params: {
    listName?: string,
  },
  query: {
    id?: string,
    message?: string,
  }
}

export default function updateList(req: Req, res: Response) {
  const { listName } = req.params;
  const { id, message } = req.query;
  if (!listName) {
    res.status(400).send('listName param is required');
    return;
  }

  if (!id || !message) {
    res.status(400).send('id and message query params are required')
    return;
  }

  const list = store.get(listName)
  const updateList = list.update(Number(id), message);
  res.status(200).send(updateList);
}

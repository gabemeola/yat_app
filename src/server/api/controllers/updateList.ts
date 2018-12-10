import { Request, Response } from 'express';
import store from './helpers/store';

interface Req extends Request {
  params: {
    listName?: string,
  },
  query: {
    message?: string,
  }
}

export default function updateTask(req: Req, res: Response) {
  const { listName } = req.params;
  const { message } = req.query;
  if (!listName) {
    res.status(400).send('listName param is required');
    return;
  }

  if (!message) {
    res.status(400).send('message query params are required')
    return;
  }

  const list = store.get(listName);
  if (typeof list === 'undefined') {
    res.status(404).send(`Could not list ${listName}`)
    return;
  }

  const updateList = list.add({
    message
  });
  res.status(200).send(updateList);
}

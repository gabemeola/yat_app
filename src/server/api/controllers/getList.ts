import { Request, Response } from 'express';
import store from './helpers/store';


interface Req extends Request {
  params: {
    listName?: string,
  }
}

export default function getList(req: Req, res: Response) {
  const { listName } = req.params;
  if (!listName) {
    res.status(400).send('listName param is required');
    return;
  }

  const todos = store.get(listName);
  if (typeof todos === 'undefined') {
    res.status(404).send(`Could not find task for ${listName}`)
    return;
  }

  res.status(200).send(todos.get());
}

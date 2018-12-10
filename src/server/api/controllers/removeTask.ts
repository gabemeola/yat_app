import { Request, Response } from 'express';
import store from './helpers/store';

interface Req extends Request {
  params: {
    listName: string,
    id?: string,
  },
}

export default function updateTask(req: Req, res: Response) {
  const { id, listName } = req.params;
  if (!id) {
    res.status(400).send('id param is required');
    return;
  }

  const list = store.get(listName);
  if (typeof list === 'undefined') {
    res.status(404).send(`Could not list ${listName}`)
    return;
  }

  const updateList = list.remove(Number(id));
  res.status(200).send(updateList);
}

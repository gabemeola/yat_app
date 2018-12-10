import { Request, Response } from 'express';
import { Socket } from 'socket.io';
import emitTaskChange from './helpers/emitTaskChange';
import store from './helpers/store';

interface Req extends Request {
  params: {
    listName: string,
    id?: string,
  },
  query: {
    message?: string,
  }
}

export default function updateTask(req: Req, res: Response) {
  const { id, listName } = req.params;
  const { message } = req.query;
  if (!id) {
    res.status(400).send('id param is required');
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

  const ws: Socket = req.app.get('ws');

  const updateList = list.update(Number(id), message);
  emitTaskChange(ws, listName, updateList);
  res.status(200).send(updateList);
}

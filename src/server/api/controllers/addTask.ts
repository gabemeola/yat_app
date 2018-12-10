import { Request, Response } from 'express';
import { Socket } from 'socket.io';
import store from './helpers/store';
import emitTaskChange from './helpers/emitTaskChange';

interface Req extends Request {
  params: {
    listName?: string,
  },
  query: {
    message?: string,
  }
}

export default function addTask(req: Req, res: Response) {
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

  const ws: Socket = req.app.get('ws');

  const updateList = list.add({
    message,
  });
  emitTaskChange(ws, listName, updateList);
  res.status(200).send(updateList);
}

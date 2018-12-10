import { Request, Response } from 'express';
import { Socket } from 'socket.io';
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

  const ws: Socket = req.app.get('ws');

  store.remove(listName)
  ws.emit('updateLists', store.keys())
  res.status(200).send();
}

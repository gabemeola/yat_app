import { Request, Response } from 'express';
import { Socket } from 'socket.io';
import store from './helpers/store';

interface Req extends Request {
  params: {
    listName?: string,
  }
}

// ws.send('hello world')

export default function createList(req: Req, res: Response) {
  const { listName } = req.params;
  if (!listName) {
    res.status(400).send('listName param is required');
    return;
  }
  const ws: Socket = req.app.get('ws');

  try {
    store.add(listName)
    const lists = store.keys();
    res.status(200).send(lists);
    ws.emit('updateLists', lists)
  } catch (e) {
    res.status(500).send(e.message);
  }
}

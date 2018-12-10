import { Socket } from 'socket.io';
import { Todo } from 'models/Todo';


export default function emitTaskChange(ws: Socket, listName: string, tasks: Todo[]) {
  ws.emit(`updateList(${listName})`, tasks);
}

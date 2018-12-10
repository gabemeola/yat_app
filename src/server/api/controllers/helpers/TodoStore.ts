import { Todo } from 'models/Todo';

type PartialTodo = {
  id?: number,
  message: Todo['message'],
  author?: Todo['author'],
  authorId?: Todo['authorId'],
}

export default class TodoStore {
  tasks: Todo[]
  constructor(initialTodos: Todo[] = []) {
    this.tasks = initialTodos;
  }
  get(id?: number) {
    if (id) return this.tasks[id];
    return this.tasks;
  }
  add(todo: PartialTodo) {
    // eslint-disable-next-line
    if (typeof todo.id === 'undefined') todo.id = this.tasks.length;
    this.tasks.push(todo as Todo)
    return this.tasks;
  }
  update(id: number, message: string) {
    this.tasks = this.tasks.map((todo) => {
      // Replace todo
      if (todo.id === id) {
        return {
          ...todo,
          message,
        }
      }

      return todo;
    })

    return this.tasks;
  }
  remove(id: number) {
    this.tasks = this.tasks.filter((todo) => todo.id !== id);
    return this.tasks;
  }
}

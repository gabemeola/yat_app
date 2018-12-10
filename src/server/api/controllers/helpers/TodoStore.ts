import { Todo } from 'models/Todo';

type PartialTodo = {
  id?: number,
  message: Todo['message'],
  author?: Todo['author'],
  authorId?: Todo['authorId'],
  done?: Todo['done'],
}

type Todos = Todo[]

// Sort done tasks to the bottom
function sortTodos(todos: Todos) {
  return todos.sort((a, b) => {
    if (a.done === b.done) return 0;
    return a.done === true ? 1 : -1
  });
}

export default class TodoStore {
  tasks: Todos
  constructor(initialTodos: Todos = []) {
    this.tasks = initialTodos;
  }
  get(id?: number) {
    if (id) return this.tasks[id];
    return sortTodos(this.tasks);
  }
  add(todo: PartialTodo) {
    // eslint-disable-next-line
    if (typeof todo.id === 'undefined') todo.id = this.tasks.length;
    // eslint-disable-next-line
    if (typeof todo.done === 'undefined') todo.done = false;
    this.tasks.push(todo as Todo)
    return this.get() as Todos;
  }
  update(id: number, message: string, done: boolean = false) {
    this.tasks = this.tasks.map((todo) => {
      // Replace todo
      if (todo.id === id) {
        return {
          ...todo,
          message,
          done,
        }
      }

      return todo;
    })

    return this.get() as Todos;
  }
  remove(id: number) {
    this.tasks = this.tasks.filter((todo) => todo.id !== id);
    return this.get() as Todos;
  }
}

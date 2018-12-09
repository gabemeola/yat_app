import { Todo } from 'models/Todo';

export default class TodoStore {
  tasks: Todo[]
  constructor(initialTodos: Todo[] = []) {
    this.tasks = initialTodos;
  }
  get(id?: number) {
    if (id) return this.tasks[id];
    return this.tasks;
  }
  add(todo: Todo) {
    this.tasks.push(todo)
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

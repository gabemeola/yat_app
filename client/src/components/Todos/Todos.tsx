import React, { useState } from 'react';
import { Todo } from 'models/Todo';
import Task from 'components/Task/Task';
import styles from './Todos.module.scss';

let init: Todo[] = []
for (let i = 0; i <= 20; i++) {
  init.push({
    message: i.toString()
  })
}

export default function Todos() {
  const initialTodoState: Todo[] = init;
  const [todos, setTodo] = useState(initialTodoState);
  const [currentTodoValue, setCurrentTodo] = useState('');

  const onTodoSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    // Save to todos
    setTodo((todos) => [...todos, {
      message: currentTodoValue,
    }]);
    // Clear input box
    setCurrentTodo('');
  }

  return (
    <main className={styles.main}>
      <form onSubmit={onTodoSubmit} className={styles.input}>
        <label htmlFor="todoInput">Add Task</label>
        <input
          placeholder="What would you like to do?"
          value={currentTodoValue}
          id="todoInput"
          onChange={(ev) => {
            setCurrentTodo(ev.target.value);
          }}
        />
      </form>
      <br />
      {todos.map((todo, index) => {
        return <Task key={todo.message + index} todo={todo} />
      })}
    </main>
  )
}

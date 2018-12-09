import React, { useState } from 'react';
import { Todo } from 'models/Todo';
import Task from 'components/Task/Task';
import styles from './Todos.module.scss';

let init: Todo[] = []
for (let i = 0; i <= 20; i++) {
  init.push({
    id: i,
    message: i.toString()
  })
}

export default function Todos() {
  const initialTodoState: Todo[] = init;
  const [todos, setTodo] = useState(initialTodoState);
  const [currentTodoValue, setCurrentTodo] = useState('');

  const handleTodoSubmit = (ev: React.FormEvent) => {
    // TODO: Scroll to bottom on add if scroll pos already on bottom
    ev.preventDefault();
    // Save to todos
    setTodo((todos) => [...todos, {
      id: todos.length,
      message: currentTodoValue,
    }]);
    // Clear input box
    setCurrentTodo('');
  }

  const handleTodoDelete = (id: number) => {
    setTodo((todos) => {
      return todos.filter((todo) => todo.id !== id);
    })
  }

  const handleTodoUpdate = (id: number, message: string) => {
    setTodo((todos) => {
      return todos.map((todo) => {
        // Replace todo
        if (todo.id === id) {
          return {
            ...todo,
            message,
          }
        }

        return todo;
      })
    })
  }

  return (
    <main className={styles.main}>
      <form onSubmit={handleTodoSubmit} className={styles.input}>
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
      {todos.map((todo) => {
        return (
          <Task
            key={todo.id}
            todo={todo}
            onDelete={handleTodoDelete}
            onUpdate={handleTodoUpdate}
          />
        )
      })}
    </main>
  )
}

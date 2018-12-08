import React, { useState } from 'react';
import { Todo } from 'models/Todo';
import Task from 'components/Task/Task';
import styles from './Todos.module.scss';

export default function Todos() {
  const initialTodoState: Todo[] = [];
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
      <h2>Todo</h2>
      <form onSubmit={onTodoSubmit}>
        <input
          placeholder="What would you like to do?"
          value={currentTodoValue}
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

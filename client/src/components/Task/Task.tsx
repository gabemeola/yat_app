import React, { useState, FormEvent } from 'react';
import { Todo } from 'models/Todo';
import useLongPress from 'hooks/useLongPress';
import styles from './Task.module.scss';

type Props = {
  todo: Todo,
  onDelete: (id: number) => any,
  onUpdate: (id: number, message: string) => any,
}

export default function Task({ todo, onDelete, onUpdate }: Props) {
  const [isEditing, setEditing] = useState(false);
  const [updateValue, setUpdateValue] = useState(todo.message);

  const toggleEditing = () => setEditing(!isEditing);
  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    onUpdate(todo.id, updateValue)
    // Close input box
    toggleEditing()
  }

  return (
    <div
      className={styles.task}
      onDoubleClick={toggleEditing}
      {...useLongPress(toggleEditing, 500)}
    >
      {isEditing === false
        ? <span>{todo.message}</span>
        : (
          <form onSubmit={handleSubmit}>
            <input
              value={updateValue}
              onChange={(ev) => setUpdateValue(ev.target.value)}
              autoFocus
            />
          </form>
        )
      }
      <button onClick={() => onDelete(todo.id)}>x</button>
    </div>
  )
}

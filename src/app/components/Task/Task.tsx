import React, { useState, useEffect, FormEvent } from 'react';
import { Todo } from 'models/Todo';
import useLongPress from 'app/hooks/useLongPress';
import styles from './Task.module.less';

type Props = {
  todo: Todo,
  onDelete: (id: number) => any,
  onUpdate: (id: number, message: string) => any,
}

export default function Task({ todo, onDelete, onUpdate }: Props) {
  const [isEditing, setEditing] = useState(false);
  const [updateValue, setUpdateValue] = useState(todo.message);

  // Reset updateValue if a user
  // enter text but doesn't save update
  useEffect(() => {
    setUpdateValue(todo.message);
  }, [isEditing])

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
      // Double click for mouse pointer
      onDoubleClick={toggleEditing}
      // Close on un-focus
      onBlur={toggleEditing}
      // Long press for touch devices
      {...useLongPress(toggleEditing, 500)}
    >
      {isEditing === false
        ? <span>{todo.message}</span>
        : (
          <form onSubmit={handleSubmit} className={styles.editField}>
            <input
              value={updateValue}
              onChange={(ev) => setUpdateValue(ev.target.value)}
              // eslint-disable-next-line
              autoFocus
            />
          </form>
        //   <div
        //     onSubmit={handleSubmit}
        //     contentEditable
        //     // @ts-ignore
        //     onInput={(ev) => setUpdateValue(ev.currentTarget.textContent)}
        //   >
        //     {updateValue}
        // </div>
        )
      }
      <button onClick={() => onDelete(todo.id)} type="button">x</button>
    </div>
  )
}

import React, { useState, useEffect, FormEvent, useRef } from 'react';
import { Todo } from 'models/Todo';
import useLongPress from 'app/hooks/useLongPress';
import Icon from 'app/components/Icon/Icon';
import trash from 'app/assets/trash.svg';
import circle from 'app/assets/circle.svg';
import circleChecked from 'app/assets/check-circle.svg';
import styles from './Task.module.less';

type Props = {
  todo: Todo,
  onDelete: (id: number) => any,
  onUpdate: (id: number, message: string, done?: boolean) => any,
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
    ev.stopPropagation();
    ev.preventDefault();
    onUpdate(todo.id, updateValue)
    // Close input box
    toggleEditing()
  }

  const handleDoneToggle = () => {
    onUpdate(todo.id, todo.message, !todo.done);
    // Close editing if it is open
    setEditing(false)
  }

  const taskRef = useRef(null);

  return (
    <div
      className={styles.task}
      ref={taskRef}
      tabIndex={0}
      role="button"
      // Double click for mouse pointer
      onDoubleClick={toggleEditing}
      onKeyPress={(ev) => {
        // Toggle editing if enter key was used and if from this element
        if (ev.nativeEvent.keyCode === 13 && ev.target === taskRef.current) {
          toggleEditing();
        }
      }}
      // Long press for touch devices
      {...useLongPress(toggleEditing, 500)}
    >
      <div className={styles.innerWrapper}>
        <button
          type="button"
          onClick={handleDoneToggle}
          onKeyPress={(ev) => {
            if (ev.nativeEvent.keyCode === 13) {
              handleDoneToggle();
            }
          }}
        >
          {todo.done
            ? <Icon icon={circleChecked} alt={`Mark ${todo.message} complete`} title={`Mark ${todo.message} complete`} />
            : <Icon icon={circle} alt={`Mark ${todo.message} incomplete`} title={`Mark ${todo.message} incomplete`} />
          }
        </button>
        {isEditing === false
          ? <span className={todo.done ? styles.line : ''}>{todo.message}</span>
          : (
            <form onSubmit={handleSubmit} className={styles.editField}>
              <input
                value={updateValue}
                onChange={(ev) => setUpdateValue(ev.target.value)}
                // Close on un-focus
                onBlur={toggleEditing}
                // eslint-disable-next-line
                autoFocus
              />
            </form>
          )
        }
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        type="button"
        title={`delete task ${todo.message}`}
      >
        <Icon alt={`delete task ${todo.message}`} icon={trash} size={18} />
      </button>
    </div>
  )
}

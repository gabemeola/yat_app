import React from 'react';
import { Todo } from 'models/Todo';
import styles from './Task.module.scss';

type Props = {
  todo: Todo
}

export default function Task({ todo }: Props) {
  return (
    <div className={styles.task}>{todo.message}</div>
  )
}

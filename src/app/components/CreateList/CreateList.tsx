import React, { useState } from 'react';
import styles from './CreateList.module.less';


type Props = {
  history: {
    push: (path: string) => any,
  }
  createList: (listName: string) => Promise<any>;
}

export default function CreateList({ createList, history }: Props) {
  const [value, setValue] = useState('');

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value)
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    if (value) {
      createList(value)
        .then(() => {
          // Go to created list
          history.push(`/list/${value}`)
        });
    }
  }

  return (
    <div>
      <h3>Create a new task list</h3>
      <br />
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="createList">
          List Name
          <input
            placeholder="Christmas Items"
            id="createList"
            value={value}
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={value === ''}>Create List</button>
      </form>
    </div>
  )
}

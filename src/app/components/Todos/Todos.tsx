import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Todo } from 'models/Todo';
import betterFetch from 'utils/betterFetch';
import Task from 'app/components/Task/Task';
import styles from './Todos.module.less';

const init: Todo[] = [{
  id: 100,
  message: 'djsakjdlka djsakjdlka  djsakjdlka  djsakjdlka djsakjdlka djsakjdlka  djsakjdlka  djsakjdlka djsakjdlka djsakjdlka  djsakjdlka  djsakjdlka djsakjdlka djsakjdlka  djsakjdlka  djsakjdlka djsakjdlka djsakjdlka  djsakjdlka  djsakjdlka ',
}]
for (let i = 0; i <= 20; i++) {
  init.push({
    id: i,
    message: i.toString()
  })
}

type Props = {
  match: {
    params: {
      list?: string,
    }
  }
}

export default function Todos(props: Props) {
  const [todos, setTodos] = useState([] as Todo[]);
  const [currentTodoValue, setCurrentTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const toggleLoading = () => setLoading(!loading);
  const [error, setError] = useState('');

  const currentList = props.match.params.list;

  const handleTodoSubmit = (ev: React.FormEvent) => {
    // TODO: Scroll to bottom on add if scroll pos already on bottom
    ev.preventDefault();
    // Save to todos
    betterFetch(`/api/lists/${currentList}?message=${currentTodoValue}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((todos: Todo[]) => {
        setTodos(() => todos);
      })
    // Clear input box
    setCurrentTodo('');
  }

  const handleTodoDelete = (id: number) => {
    betterFetch(`/api/lists/${currentList}/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((todos: Todo[]) => {
        setTodos(() => todos);
      })
  }

  const handleTodoUpdate = (id: number, message: string) => {
    betterFetch(`/api/lists/${currentList}/${id}?message=${message}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((todos: Todo[]) => {
        setTodos(() => todos);
      })
  }

  useEffect(() => {
    betterFetch(`/api/lists/${currentList}`)
      .then((res) => res.json())
      .then((todos: Todo[]) => {
        console.log('todos', todos);
        setTodos(() => todos);
      })
      .catch(() => {
        setError(`Error loading ${currentList}`)
        toggleLoading()
      })
  }, [currentList])


  if (error) {
    return (
      <Fragment>
        <p>{error}</p>
        <Link to="/">Go Home</Link>
      </Fragment>
    )
  }

  return (
    <main className={styles.main}>
      <h3 style={{ textTransform: 'capitalize' }}>{currentList}</h3>
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
      {todos.length > 0
        ? todos.map((todo) => {
          return (
            <Task
              key={todo.id}
              todo={todo}
              onDelete={handleTodoDelete}
              onUpdate={handleTodoUpdate}
            />
          )
        })
        : (
          <span>
            👀 Looks empty around here. Add some tasks!
          </span>
        )
      }
    </main>
  )
}

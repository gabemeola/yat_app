import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Todo } from 'models/Todo';
import betterFetch from 'utils/betterFetch';
import ws from 'app/config/socket';
import Loading from 'app/components/Indicators/Loading';
import ActivityBar from 'app/components/ActivityBar/ActivityBar';
import Task from 'app/components/Task/Task';
import styles from './Todos.module.less';


type Props = {
  match: {
    params: {
      list: string,
    }
  }
}

export default function Todos(props: Props) {
  const [todos, setTodos] = useState([] as Todo[]);
  const [currentTodoValue, setCurrentTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const currentList = props.match.params.list;

  const handleSubmit = (ev: React.FormEvent) => {
    // TODO: Scroll to bottom on add if scroll pos already on bottom
    ev.preventDefault();
    // Save to todos
    betterFetch(`/api/lists/${currentList}?message=${currentTodoValue}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((todos: Todo[]) => {
        setTodos(todos);
      })
      .catch((err) => {
        console.error('error submitting todo', err);
      })
    // Clear input box
    setCurrentTodo('');
  }

  const handleDelete = (id: number) => {
    betterFetch(`/api/lists/${currentList}/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((todos: Todo[]) => {
        setTodos(todos);
      })
      .catch((err) => {
        console.error(`error deleting todo ${id}`, err)
      })
  }

  const handleUpdate = (id: number, message: string, done: boolean = false) => {
    betterFetch(`/api/lists/${currentList}/${id}?message=${message}&done=${done}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((todos: Todo[]) => {
        setTodos(todos);
      })
      .catch((err) => {
        console.error(`error updating todo ${id}`, err)
      })
  }

  useEffect(() => {
    setLoading(() => true)
    // Initial List Fetch
    betterFetch(`/api/lists/${currentList}`)
      .then((res) => res.json())
      .then((todos: Todo[]) => {
        setTodos(todos);
        setLoading(false)
      })
      .catch(() => {
        setError(`Could not load list "${currentList}"`)
        setLoading(false)
      })

    // Listen for changes
    const event = `updateList(${currentList.toLowerCase()})`;
    ws.on(event, (todos: Todo[]) => {
      setTodos(todos);
    })

    return () => {
      // Clean up websocket
      ws.off(event);
    }
  }, [currentList])


  if (error) {
    return (
      <div>
        <h4>{error}</h4>
        <Link to="/">Go Home</Link>
      </div>
    )
  }

  if (loading) {
    return <Loading />
  }

  return (
    <main className={styles.main}>
      <div className={styles.nav}>
        <h3 style={{ textTransform: 'capitalize' }}>{currentList}</h3>
        <ActivityBar />
      </div>
      <form onSubmit={handleSubmit} className={styles.input}>
        <label htmlFor="todoInput">
          Add Task
          <input
            placeholder="What would you like to do?"
            value={currentTodoValue}
            id="todoInput"
            onChange={(ev) => {
              setCurrentTodo(ev.target.value);
            }}
          />
        </label>
      </form>
      <br />
      {todos.length > 0
        ? todos.map((todo) => {
          return (
            <Task
              key={todo.id}
              todo={todo}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
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

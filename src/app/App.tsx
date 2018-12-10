import React, { useEffect, useState, Fragment } from 'react';
import { Route } from 'react-router-dom';
import betterFetch from 'utils/betterFetch';
import Header from 'app/components/Header/Header';
import Nav from 'app/components/Nav/Nav';
import Todos from 'app/components/Todos/Todos';
import socket from './config/socket';
import styles from './App.module.less';


export default function App() {
  const [lists, setLists] = useState([] as string[]);
  const [loading, setLoading] = useState(true);

  const toggleLoading = () => setLoading(!loading);

  useEffect(() => {
    // Initial List fetch
    betterFetch('/api/lists')
      .then((res) => res.json())
      .then((lists: string[]) => {
        setLists(() => lists);
        toggleLoading();
      })

    // Listen to updates
    const event = 'updateLists';
    socket.on(event, (lists: string[]) => {
      setLists(() => lists);
    })

    return () => {
      // Clean up socket
      socket.off(event);
    }
  }, []);

  const createList = (listName: string) => {
    betterFetch(`/api/lists/${listName}`, {
      method: 'POST',
    }).then((res) => res.json())
      .then((lists: string[]) => {
        setLists(() => lists);
      })
      .catch((err) => {
        console.error('error creating list', err);
      })
  }

  return (
    <div className={styles.page}>
      <Header />

      {loading === false
        ? (
          <Fragment>
            <Nav
              lists={lists}
              createList={createList}
            />
            <Route
              exact
              path="/:list"
              component={Todos}
            />
          </Fragment>
        )
        : null
      }


      {/* <Footer /> */}
    </div>
  );
}

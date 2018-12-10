import React, { useEffect, useState, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import betterFetch from 'utils/betterFetch';
import Header from 'app/components/Header/Header';
import Nav from 'app/components/Nav/Nav';
import Todos from 'app/components/Todos/Todos';
import CreateList from 'app/components/CreateList/CreateList';
import Loading from 'app/components/Indicators/Loading';
import socket from './config/socket';
import styles from './App.module.less';


export default function App() {
  const [lists, setLists] = useState([] as string[]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true)
    // Initial List fetch
    betterFetch('/api/lists')
      .then((res) => res.json())
      .then((lists: string[]) => {
        setLists(lists);
        setLoading(false)
      })

    // Listen to updates
    const event = 'updateLists';
    socket.on(event, (lists: string[]) => {
      setLists(lists);
    })

    return () => {
      // Clean up socket
      socket.off(event);
    }
  }, []);

  const createList = (listName: string) => {
    return betterFetch(`/api/lists/${listName}`, {
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
            <Nav lists={lists} />

            <Switch>
              <Route
                exact
                path="/create"
                render={(props) => (
                  <CreateList
                    createList={createList}
                    history={props.history}
                  />
                )}
              />
              <Route
                exact
                path="/list/:list"
                component={Todos}
              />
              {/* Redirect to first list if available or create */}
              <Redirect exact from="/" to={lists[0] ? `/list/${lists[0]}` : '/create'} />
              {/* 404 catch all */}
              <Route render={() => {
                return (
                  <div>
                    <h4>404</h4>
                    <p>Page Not Found</p>
                  </div>
                )
              }}
              />
            </Switch>

          </Fragment>
        )
        : <Loading />
      }
    </div>
  );
}

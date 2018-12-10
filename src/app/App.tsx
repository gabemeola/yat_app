import React, { useEffect, useState, Fragment } from 'react';
import { Route } from 'react-router-dom';
import betterFetch from 'utils/betterFetch';
import Header from 'app/components/Header/Header';
import Nav from 'app/components/Nav/Nav';
import Todos from 'app/components/Todos/Todos';
import styles from './App.module.less';


export default function App() {
  const [lists, setLists] = useState([] as string[]);
  const [loading, setLoading] = useState(true);

  const toggleLoading = () => setLoading(!loading);

  useEffect(() => {
    betterFetch('/api/lists')
      .then((res) => res.json())
      .then((lists: string[]) => {
        setLists(() => lists);
        toggleLoading();
      })
  }, []);

  const createList = (listName: string) => {
    betterFetch(`/api/lists/${listName}`, {
      method: 'POST',
    }).then((res) => res.json())
      .then((lists: string[]) => {
        setLists(() => lists);
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
              path="/:list"
              render={(props) => {
                return <Todos {...props} />
              }}
            />
          </Fragment>
        )
        : null
      }


      {/* <Footer /> */}
    </div>
  );
}

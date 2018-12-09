import React from 'react';
import { Route } from 'react-router-dom';
import Header from 'app/components/Header/Header';
import Nav from 'app/components/Nav/Nav';
import Todos from 'app/components/Todos/Todos';
import styles from './App.module.less';


export default function App() {
  return (
    <div className={styles.page}>
      <Header />

      <Nav />
      <Route path="/:list?" component={Todos} />

      {/* <Footer /> */}
    </div>
  );
}

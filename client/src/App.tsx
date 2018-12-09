import React from 'react';
import { Route } from 'react-router-dom';
import Header from 'components/Header/Header';
import Nav from 'components/Nav/Nav';
import Todos from 'components/Todos/Todos';
import styles from './App.module.scss';


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

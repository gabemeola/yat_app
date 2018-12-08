import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Header from 'components/Header/Header';
import Todos from 'components/Todos/Todos';


export default function App() {
  return (
    <Fragment>
      <Header />

      <Route path="/:list?" component={Todos} />

      {/* <Footer /> */}
    </Fragment>
  );
}

import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import * as Forms from './containers/Forms';

const App = ({ form }) => {
  const Form = Forms[form];
  return (
    <div className={css(styles.container)}>
      <Form kkk={form} />
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 740,
    margin: 'auto',
    fontFamily: 'Helvetica, Arial, sans-serif',
  },
});

export default App;

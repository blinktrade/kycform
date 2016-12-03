import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import Form from './containers/FormBase';

const App = () => (
  <div className={css(styles.container)}>
    <Form />
  </div>
);

const styles = StyleSheet.create({
  container: {
    width: 740,
    margin: 'auto',
    fontFamily: 'Helvetica, Arial, sans-serif',
  },
});

export default App;

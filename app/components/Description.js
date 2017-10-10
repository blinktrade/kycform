/* @flow */
import React from 'react';

import { StyleSheet, css } from 'aphrodite';

type Props = {
  text: string
};

const Description = ({ text }: Props) => (
  <p className={css(styles.container)}>{text}</p>
);

const styles = StyleSheet.create({
  container: {
    fontSize: 14,
    color: '#555',
    padding: '6px 12px 6px 12px',
  },
});

export default Description;

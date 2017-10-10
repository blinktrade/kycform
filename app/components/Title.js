/* @flow */
import React from 'react';
import { StyleSheet, css } from 'aphrodite';

type Props = {
  title: string,
  subtitle?: string,
};

const Title = ({ title, subtitle }: Props) => (
  <div className={css(styles.container)}>
    <h2 className={css(styles.title)}>{title}</h2>
    <span className={css(styles.subtitle)}>{subtitle}</span>
  </div>
);

const styles = StyleSheet.create({
  container: {
    width: '50%',
    margin: '30px auto 30px',
    textAlign: 'center',
  },
  title: {
    margin: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 12,
  },
});

export default Title;

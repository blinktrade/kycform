import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const Title = ({ title, subtitle }) => (
  <div className={css(styles.container)}>
    <h2 className={css(styles.title)}>{title}</h2>
    <span className={css(styles.subtitle)}>{subtitle}</span>
  </div>
);

Title.propTypes = {
  title: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string,
};

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

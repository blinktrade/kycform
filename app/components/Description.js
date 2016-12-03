import React from 'react';

import { StyleSheet, css } from 'aphrodite';

const Description = ({ text }) => (
  <p className={css(styles.container)}>{text}</p>
);

Description.propTypes = {
  text: React.PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    fontSize: 14,
    color: '#555',
    padding: '6px 12px 6px 12px',
  },
});

export default Description;

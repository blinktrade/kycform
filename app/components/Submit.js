import React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { FormattedMessage } from 'react-intl';

const Submit = ({ submitting }) => (
  <button type="submit" disabled={submitting} className={css(styles.button)}>
    {submitting
      ? <FormattedMessage id="submit.sending" defaultMessage="Sending" />
      : <FormattedMessage id="submit.label" defaultMessage="Submit" />}
  </button>
);

const styles = StyleSheet.create({
  button: {
    padding: 4,
    marginLeft: 210,
    minWidth: 80,
    borderRadius: 4,
    cursor: 'pointer',
    color: 'white',
    backgroundColor: '#006dcc',
    transition: 'all 0.1s linear',
    border: '1px solid #cccccc',
    borderColor: '#0044cc #0044cc #002a80',
    textTransform: 'uppercase',
    fontSize: 12,
    ':hover': {
      backgroundColor: '#0044cc',
    },
    ':disabled': {
      opacity: 0.4,
    },
  },
});

export default Submit;

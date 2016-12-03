import React from 'react';

import R from 'ramda';
import { intlShape } from 'react-intl';

import { StyleSheet, css } from 'aphrodite';

import i18n from '../utils/messages';

const ErrorMessage = ({ message, values }, context) => {
  const { formatMessage } = context.intl;
  const fieldNames = R.compose(
    R.join(', '),
    R.map(x => formatMessage(i18n[`${x}Group`])),
    R.split(','),
  )(values);

  return (
    <div className={css(styles.container)}>
      <h3>
        {formatMessage(message, { name: fieldNames })}
      </h3>
    </div>
  );
};

ErrorMessage.contextTypes = {
  intl: intlShape.isRequired,
};

const styles = StyleSheet.create({
  container: {
    color: 'red',
    textAlign: 'center',
  },
});

export default ErrorMessage;

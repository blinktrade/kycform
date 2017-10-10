/* @flow */
import React from 'react';

import R from 'ramda';
import { intlShape } from 'react-intl';

import { StyleSheet, css } from 'aphrodite';

import i18n from '../utils/messages';
import type { I18nMessage } from '../utils/types';

type Props = {
  message: I18nMessage,
  values: Array<any>,
};

const ErrorMessage = ({ message, values }: Props, context: any) => {
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

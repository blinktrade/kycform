/* @flow */
import React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { FormattedMessage } from 'react-intl';

type Props = {
  isActive: boolean,
  hasError: boolean,
};

const FieldError = ({ isActive, hasError }: Props) => !isActive && hasError && (
  <div className={css(styles.error)}>
    <FormattedMessage
      id="error.required"
      defaultMessage="This field is required."
    />
  </div>
);

const styles = StyleSheet.create({
  error: {
    padding: 6,
    paddingLeft: 12,
    marginTop: 6,
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 4,
    color: 'white',
    backgroundColor: '#e15353',
  },
});

export default FieldError;

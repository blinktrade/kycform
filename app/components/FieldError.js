import React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { FormattedMessage } from 'react-intl';

const FieldError = ({ isActive, hasError }) => !isActive && hasError && (
  <div className={css(styles.error)}>
    <FormattedMessage
      id="error.required"
      defaultMessage="This field is required."
    />
  </div>
);

FieldError.propTypes = {
  isActive: React.PropTypes.bool.isRequired,
  hasError: React.PropTypes.bool.isRequired,
};

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

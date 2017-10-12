/* @flow */
import React, { Component } from 'react';
import type { Node } from 'react';
import {
  getFormMeta,
  getFormSyncErrors
} from 'redux-form';

import R from 'ramda';
import { connect } from 'react-redux';
import { intlShape } from 'react-intl';
import { StyleSheet, css } from 'aphrodite';

import FieldError from './FieldError';

import i18n from '../utils/messages';

type Props = {
  name: string,
  active: string,
  syncErrors: Object,
  formMeta: Object,
  fields?: Array<any>,
  required?: boolean,
  children: Node,
};

class FieldGroup extends Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    required: true,
    fields: [],
  };

  containsInFields = R.compose(
    R.contains(true),
    R.map(R.contains(R.__, this.props.fields)),
    R.keys,
  )

  renderRequiredIndicator() {
    return (
      <span className={css(styles.requiredIndicator)}>*</span>
    );
  }

  renderLabel(name) {
    const { required } = this.props;
    const { formatMessage } = this.context.intl;
    const message = i18n[name] ? formatMessage(i18n[name]) : name;
    return (
      <label htmlFor={name} className={css(styles.label)}>
        {message}
        {required && this.renderRequiredIndicator()}
      </label>
    );
  }

  render() {
    const { children, name, fields, active, formMeta, syncErrors } = this.props;

    const isActive = R.and(R.not(R.isNil(active)), R.contains(active, fields));
    const hasError = R.and(
      this.containsInFields(formMeta),
      this.containsInFields(syncErrors)
    );

    const activeStyle = isActive ? styles.active : false;
    const errorStyle = hasError ? styles.error : false;

    return (
      <li className={css(styles.group, errorStyle, activeStyle)}>
        {this.renderLabel(name)}
        <div className={css(styles.fields)}>
          {React.Children.map(children, child => child)}
          <FieldError
            hasError={hasError}
            isActive={isActive}
          />
        </div>
      </li>
    );
  }
}

const styles = StyleSheet.create({
  group: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 32,
    paddingRight: 32,
    margin: 6,
    width: '100%',
  },
  label: {
    fontWeight: 600,
    display: 'inline-block',
    float: 'left',
    width: 160,
    padding: 4,
  },
  fields: {
    display: 'inline-block',
  },
  requiredIndicator: {
    color: 'red',
    marginLeft: 8,
  },
  error: {
    background: '#fff4f4',
  },
  active: {
    background: '#fffbea',
  },
});

const mapStateToProps = state => ({
  active: state.form.verification.active,
  formMeta: getFormMeta('verification')(state),
  syncErrors: getFormSyncErrors('verification')(state)
});

export default connect(mapStateToProps)(FieldGroup);

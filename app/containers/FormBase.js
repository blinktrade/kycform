/* @flow */
import React, { Component } from 'react';
import type { Node } from 'react';

import R from 'ramda';

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { IntlProvider } from 'react-intl';
import { StyleSheet, css } from 'aphrodite';

import locales from '../utils/locales';
import { validateForm } from '../utils/validationUtils';
import Submit from '../components/Submit';
import ErrorMessage from '../components/ErrorMessage';

const idFields = [];
const validateFields = {};

type Props = {
  app: Object,
  submitting: boolean,
  handleSubmit: Function,
  dispatch: Function,
  children: Node,
};

type State = {
  hasError: boolean,
  errorFields: Array<any>,
  errorMessage: Object,
};

class FormBase extends Component<Props, State> {
  state = {
    hasError: false,
    errorFields: [],
    errorMessage: {},
  };

  onSubmit = (values) => {
    const errors = validateForm(values, validateFields);

    if (R.not(R.isEmpty(errors))) {
      // Invoke sync errors directly on submit
      return this.props.dispatch({
        type: '@@redux-form/UPDATE_SYNC_ERRORS',
        meta: { form: 'verification' },
        payload: { syncErrors: errors },
      });
    }

    const formData = new FormData();
    const fileFields = R.compose(R.keys, R.filter(R.is(File)))(values);

    R.mapObjIndexed((value, key) => formData.append(key, value), values);
    formData.append('fileFields', fileFields.join(','));
    formData.append('idFields', idFields.join(','));

    return fetch('/api/verify', {
      body: formData,
      method: 'POST',
    })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        this.setState({
          hasError: true,
          errorFields: res.error.fields,
          errorMessage: res.error.message,
        });
      }
    });
  }

  renderErrorMessages() {
    const { hasError, errorMessage, errorFields } = this.state;
    return hasError && errorFields && (
      <ErrorMessage message={errorMessage} values={errorFields} />
    );
  }

  renderField(Field) {
    const { props, type } = Field;
    const { name, validate } = type;
    if (props.required !== false && validate) {
      validateFields[name] = validate;
    }

    if (R.equals('FieldNationalID', name) && !R.contains(props.name, idFields)) {
      idFields.push(props.name);
    }

    return Field;
  }

  renderFields() {
    const { children } = this.props;
    return (
      <ul className={css(styles.formContainer)}>
        {React.Children.map(children, this.renderField)}
      </ul>
    );
  }

  renderSubmitButton() {
    const { submitting } = this.props;
    return (
      <Submit submitting={submitting} />
    );
  }

  renderForm() {
    return (
      <form encType="multipart/form-data" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        {this.renderErrorMessages()}
        {this.renderFields()}
        {this.renderSubmitButton()}
      </form>
    );
  }

  render() {
    const { lang } = this.props.app;
    return (
      <IntlProvider
        key={lang}
        locale={lang}
        messages={locales[lang]}>
        {this.renderForm()}
      </IntlProvider>
    );
  }
}

FormBase = reduxForm({
  form: 'verification',
  validate: values => validateForm(values, validateFields),
})(FormBase);

const styles = StyleSheet.create({
  formContainer: {
    listStyle: 'none',
    fontSize: 14,
    margin: 0,
    padding: 0,
  },
});

const mapStateToProps = state => ({
  app: state.app,
  initialValues: {
    email: state.app.email,
    username: state.app.username,
    user_id: state.app.userId,
    broker_id: state.app.brokerId,
    broker_username: state.app.form,
    country: state.app.country,
    testnet: state.app.testnet,
  },
});

export default connect(mapStateToProps)(FormBase);

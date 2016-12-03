import React, {
  Component,
  PropTypes,
} from 'react';

import R from 'ramda';

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { IntlProvider } from 'react-intl';
import { StyleSheet, css } from 'aphrodite';

import locales from '../utils/locales';
import Submit from '../components/Submit';
import ErrorMessage from '../components/ErrorMessage';

import * as Forms from './Forms';

const validateFields = {};
let reduxValidate = () => ({});

class FormBase extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    reduxValidate = this.validate.bind(this);
    this.submit = this.submit.bind(this);
  }

  state = {
    hasError: false,
    errorFields: [],
    errorMessage: {},
  };

  validate(values) {
    const mergeErrors = R.compose(
      R.mergeAll,
      R.values,
      R.map(x => x(values))
    );

    const errors = mergeErrors(validateFields);
    return errors;
  }

  submit(values) {
    const errors = this.validate(values);

    if (R.not(R.isEmpty(errors))) {
      // Invoke sync errors directly on submit
      return this.props.dispatch({
        type: 'redux-form/UPDATE_SYNC_ERRORS',
        meta: { form: 'verification' },
        payload: { syncErrors: errors },
      });
    }

    const formData = new FormData();
    const fileFields = R.compose(R.keys, R.filter(R.is(File)))(values);

    R.mapObjIndexed((value, key) => formData.append(key, value), values);
    formData.append('fileFields', fileFields);
    formData.append('fileSignature', {});

    return fetch('/api/verify', {
      body: formData,
      method: 'POST',
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.error) {
          this.setState({
            hasError: true,
            errorFields: res.error.fields,
            errorMessage: res.error.message,
          });
        }
      });
  }

  renderFields(child) {
    const fields = child.props.children;
    return (
      <ul className={css(styles.formContainer)}>
        {React.Children.map(fields, (Field) => {
          if (Field.props.required !== false) {
            const { name, validate } = Field.type;
            validateFields[name] = R.defaultTo(R.always)(validate);
          }
          return Field;
        })}
      </ul>
    );
  }

  renderForm(SelectedForm) {
    const { hasError, errorMessage, errorFields } = this.state;
    const { handleSubmit, submitting } = this.props;
    return (
      <form encType="multipart/form-data" onSubmit={handleSubmit(this.submit)}>
        {hasError && errorFields && <ErrorMessage message={errorMessage} values={errorFields} />}
        <SelectedForm fields={this.renderFields} />
        <Submit submitting={submitting} />
      </form>
    );
  }

  render() {
    const { app } = this.props;
    const { lang } = app;
    return (
      <IntlProvider
        key={lang}
        locale={lang}
        messages={locales[lang]}
      >
        {this.renderForm(Forms[app.form])}
      </IntlProvider>
    );
  }
}

FormBase = reduxForm({
  form: 'verification',
  validate: values => reduxValidate(values),
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

export default connect(
  mapStateToProps,
  undefined,
)(FormBase);

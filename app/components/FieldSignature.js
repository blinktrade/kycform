/* @flow */
import React, { Component } from 'react';

import { connect } from 'react-redux';

import Signature from 'react-signature-pad';
import { Field, change } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { StyleSheet, css } from 'aphrodite';

import FieldGroup from './FieldGroup';

let signature: any;

const name = 'signature';

type Props = {
  required?: boolean,
  dispatch: Function
};

class FieldSignature extends Component<Props> {
  static validate = () => (signature && signature.isEmpty() ? { signature: 'error.required' } : {});

  captureSignatureRef = (ref) => {
    signature = ref;
  }

  changeForm(key: string, value: any): void {
    this.props.dispatch(change('verification', key, value, true, true));
  }

  clearSignature = (e) => {
    e.preventDefault();

    signature.clear();
    this.changeForm(name, '');
    return false;
  }

  signatureToFile = () => {
    const base64 = signature.toDataURL();
    const fileName = 'signature.png';
    return fetch(base64)
      .then(res => res.arrayBuffer())
      .then(buffer => new File([buffer], fileName, { type: 'image/png' }));
  };


  handleOnEnd = () => {
    this.signatureToFile().then(file => this.changeForm(name, file));
  }

  render() {
    const { required } = this.props;
    return (
      <FieldGroup name="signatureGroup" required={required} fields={[name]}>
        <style>{'canvas {width: 350px}'}</style>
        <Field
          name={name}
          type="hidden"
          component="input"
        />
        <div className={css(styles.signature)}>
          <Signature
            clearButton={false}
            onEnd={this.handleOnEnd}
            ref={this.captureSignatureRef}
          />
        </div>
        <button className={css(styles.clear)} onClick={this.clearSignature}>
          <FormattedMessage id="signature.clear" defaultMessage="Clear" />
        </button>
      </FieldGroup>
    );
  }
}

const styles = StyleSheet.create({
  signature: {
    width: 350,
    border: '1px solid #ccc',
  },
  clear: {
    marginTop: 4,
    float: 'right',
  },
});

const mapStateToProps = state => ({
  form: state.form,
});

export default connect(mapStateToProps)(FieldSignature);

/* @flow */
import React, { Component } from 'react';

import R from 'ramda';
import { intlShape } from 'react-intl';
import { css } from 'aphrodite';
import { Field } from 'redux-form';

import FieldFile from './FieldFile';
import i18n from '../utils/messages';
import SharedStyles from './styles';

type Props = {
  type?: string,
  name: string,
  description?: string,
  component: string | Function,
  data?: Array<any>,
  size?: number,
  renderSeparator: boolean,
  renderSubLabel: boolean,
};

class FieldBase extends Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    size: 4,
    type: 'text',
    component: 'input',
    renderSeparator: false,
    renderSubLabel: true,
  };

  renderSeparator() {
    return <span className={css(SharedStyles.separator)}>-</span>;
  }

  renderSubLabel(id: string) {
    const { name, description } = this.props;
    const { formatMessage } = this.context.intl;
    const i18nMessage = description || name;
    const message = i18n[i18nMessage] ? formatMessage(i18n[i18nMessage]) : name;
    return (
      <label className={css(SharedStyles.subLabel)} htmlFor={id}>
        {message}
      </label>
    );
  }

  renderOptions = (option: string, index: number) => {
    const { formatMessage } = this.context.intl;

    const isObject = R.is(Object);
    const opt = R.when(isObject, R.prop('option'))(option);
    const value = R.when(isObject, R.prop('value'))(option);

    return index === 0
      ? <option key={opt} />
      : <option key={opt} value={value}>
        {i18n[opt] ? formatMessage(i18n[opt]) : opt}
      </option>;
  }

  renderField = ({ input, id, name, size, type, data }: any) => {
    const { component, renderSeparator } = this.props;

    const inputSize = `inputSize${size}`;
    const FormComponent = component;
    return (
      <div>
        <FormComponent
          {...input}
          id={id}
          type={type}
          name={name}
          className={css(SharedStyles.input, SharedStyles[inputSize])}>
          {R.when(
            R.complement(R.isNil),
            R.compose(x => x.map(this.renderOptions), R.insert(0, ''))
          )(data)}
        </FormComponent>
        {renderSeparator && this.renderSeparator()}
      </div>
    );
  }

  render() {
    const { name, size, data, type, renderSubLabel } = this.props;
    const component: any = type === 'file' ? FieldFile : this.renderField;
    const id = `id_${name}`;
    return (
      <div key={name} className={css(SharedStyles.fieldContainer)}>
        <Field
          id={id}
          name={name}
          type={type}
          size={size}
          data={data}
          component={component}
        />
        {renderSubLabel && this.renderSubLabel(id)}
      </div>
    );
  }
}

export default FieldBase;

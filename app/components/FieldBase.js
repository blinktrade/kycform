import React, {
  Component,
  PropTypes,
} from 'react';

import { intlShape } from 'react-intl';
import { css } from 'aphrodite';
import { Field } from 'redux-form';

import FieldFile from './FieldFile';
import i18n from '../utils/messages';
import SharedStyles from './styles';

class FieldBase extends Component {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  static propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    data: PropTypes.arrayOf(PropTypes.any),
    size: PropTypes.number,
    renderSeparator: PropTypes.bool,
    renderSubLabel: PropTypes.bool,
  };

  static defaultProps = {
    size: 4,
    type: 'text',
    component: 'input',
    renderSeparator: false,
    renderSubLabel: true,
  };

  constructor(props) {
    super(props);

    this.renderField = this.renderField.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
  }

  renderSeparator() {
    return <span className={css(SharedStyles.separator)}>-</span>;
  }

  renderSubLabel(id, name) {
    const { formatMessage } = this.context.intl;
    const message = i18n[name] ? formatMessage(i18n[name]) : name;
    return (
      <label className={css(SharedStyles.subLabel)} htmlFor={id}>
        {message}
      </label>
    );
  }

  renderOptions(option, index) {
    return index === 0
      ? <option key={option} />
      : <option key={option} value={option}>{option}</option>;
  }

  renderField({ input, id, name, size, type, data }) {
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
          className={css(SharedStyles.input, SharedStyles[inputSize])}
        >
          {data && data.map(this.renderOptions)}
        </FormComponent>
        {renderSeparator && this.renderSeparator()}
      </div>
    );
  }

  render() {
    const { name, size, data, type, renderSubLabel } = this.props;
    const component = type === 'file' ? FieldFile : this.renderField;
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
        {renderSubLabel && this.renderSubLabel(id, name)}
      </div>
    );
  }
}

export default FieldBase;

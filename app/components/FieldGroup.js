import React, {
  Component,
  PropTypes,
} from 'react';

import R from 'ramda';
import { connect } from 'react-redux';
import { intlShape } from 'react-intl';
import { StyleSheet, css } from 'aphrodite';

import FieldError from './FieldError';

import i18n from '../utils/messages';

class FieldGroup extends Component {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    form: PropTypes.object,
    fields: PropTypes.array,
    required: PropTypes.bool,
    children: PropTypes.node,
  };

  static defaultProps = {
    required: true,
    fields: [],
  };

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
    const { children, name, fields, form } = this.props;
    const { syncErrors: errors } = form;
    const isActive = R.and(
      R.has('active', form),
      R.contains(R.prop('active', form), fields)
    );
    const contains = R.compose(
      R.contains(true),
      R.map(R.contains(R.__, fields)),
      R.keys,
    );

    const hasError = R.and(contains(form.fields), contains(errors));

    const activeStyle = isActive ? styles.active : false;
    const errorStyle = hasError ? styles.error : false;

    return (
      <li className={css(styles.group, errorStyle, activeStyle)}>
        {this.renderLabel(name)}
        <div className={css(styles.fields)}>
          {React.Children.map(children, child => child)}
          <FieldError
            form={form}
            fields={fields}
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
  form: state.form.verification,
});

export default connect(
  mapStateToProps,
  undefined,
)(FieldGroup);

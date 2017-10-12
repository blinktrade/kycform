/* @flow */
import React, { Component } from 'react';

import { StyleSheet, css } from 'aphrodite';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from '../actions';

type Languages = {
  key: string,
  value: string,
};

type Props = {
  setLanguage: Function,
  languages: Array<Languages>,
  currentLang: string
};

class FieldLanguage extends Component<Props> {
  handleChangeLanguage = (e) => {
    this.props.setLanguage(e.target.value);
  }

  renderOption({ key, value }) {
    return (
      <option key={key} id={key} value={key}>
        {value}
      </option>
    );
  }

  render() {
    const { languages, currentLang } = this.props;
    return (
      <div className={css(styles.container)}>
        <select onChange={this.handleChangeLanguage} defaultValue={currentLang}>
          {languages.map(this.renderOption)}
        </select>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    textAlign: 'right',
  },
});

const mapStateToProps = state => ({
  currentLang: state.app.lang,
});

const mapDispatchToProps = dispatch => bindActionCreators(AppActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FieldLanguage);

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
  handleChangeLanguage(e) {
    this.props.setLanguage(e.target.value);
  }

  render() {
    const { languages, currentLang } = this.props;
    return (
      <div className={css(styles.container)}>
        <select onChange={e => this.handleChangeLanguage(e)} defaultValue={currentLang}>
          {languages.map(x => <option key={x.key} id={x.key} value={x.key}>{x.value}</option>)}
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

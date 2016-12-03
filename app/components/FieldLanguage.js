import React, { Component, PropTypes } from 'react';

import { StyleSheet, css } from 'aphrodite';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from '../actions';

class FieldLanguage extends Component {
  static propTypes = {
    setLanguage: PropTypes.func.isRequired,
    languages: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })).isRequired,
    currentLang: PropTypes.string.isRequired,
  };

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

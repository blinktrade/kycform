import React from 'react';
import PropTypes from 'prop-types';
import render from 'react-test-renderer';
import enzyme from 'enzyme';
import { IntlProvider, intlShape } from 'react-intl';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import appReducer from '../reducers/app.reducer';

const intlProvider = new IntlProvider({ locale: 'en' }, {});

const { intl } = intlProvider.getChildContext();
const reducers = {
  app: appReducer,
  form: formReducer,
};

export const getIntlContext = () => intl;
const createTestStore = (initialState = {}) => createStore(combineReducers(reducers), initialState);

export function getStore(component) {
  const instance = component.instance();
  const wrapped =
     instance.wrappedInstance       // wrapped from redux-form
  || instance.getWrappedInstance(); // wrapped from redux connect

  return wrapped.props.store;
}

export const getContext = store => ({
  context: { intl, store },
  childContextTypes: {
    intl: intlShape,
    store: PropTypes.any,
  }
});

function clone(node, store) {
  return React.cloneElement(node, { intl, store });
}

export function shallow(node, initialState) {
  const store = createTestStore(initialState);
  return enzyme.shallow(clone(node, store), getContext(store));
}

export function mount(node, initialState) {
  const store = createTestStore(initialState);
  return enzyme.mount(clone(node, store), getContext(store));
}

export function renderer(node, store = {}, props = { locale: 'en' }) {
  return render.create(
    <IntlProvider {...props}>{node}</IntlProvider>
  );
}

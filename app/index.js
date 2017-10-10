/* @flow */
import React from 'react';
// $FlowFixMe
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import App from './App';

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);
const rootElement = document.getElementById('root');

const { form } = store.getState().app;

hydrate(<Provider store={store}><App form={form} /></Provider>, rootElement);

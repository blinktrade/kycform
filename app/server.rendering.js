import R from 'ramda';
import qs from 'qs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { StyleSheetServer } from 'aphrodite';

import App from './App';
import locales from './utils/locales';
import configureStore from './store/configureStore';
import { initialState } from './reducers/app.reducer';

export default function (req, res) {
  const {
    form,
    userId,
    brokerId,
    countryNumber,
    country,
    state,
    testnet,
  } = initialState;

  const params = qs.parse(req.query);

  const lang = R.defaultTo(initialState.lang)(params.lang).substring(0, 2);
  const getQuery = R.compose(R.flip(R.defaultTo), R.view);
  const getQueryInt = R.compose(R.flip(R.defaultTo), parseInt, R.view);

  const app = {
    lang,
    email: params.email,
    username: params.username,
    userId: getQueryInt(R.lensProp('user_id'), params)(userId),
    brokerId: getQueryInt(R.lensProp('broker_id'), params)(brokerId),
    form: getQuery(R.lensProp('broker_username'), params)(form),
    countryNumber: getQueryInt(R.lensPath(['phoneNumber', 'country']), params)(countryNumber),
    country: getQuery(R.lensPath(['address', 'country']), params)(country),
    state: getQuery(R.lensPath(['address', 'state']), params)(state),
    testnet: getQuery(R.lensProp('testnet'), params)(testnet),
  };

  const preloadedState = { app };

  const store = configureStore(preloadedState);
  const { html, css } = StyleSheetServer.renderStatic(() => renderToString(
    <Provider store={store}>
      <IntlProvider
        key={lang}
        locale={lang}
        messages={locales[lang]}>
        <App />
      </IntlProvider>
    </Provider>
  ));

  // Grab the initial state from our Redux store
  const finalState = store.getState();

  // Send the rendered page back to the client
  res.send(renderFullPage(html, css, finalState));
}

const renderFullPage = (html, css, preloadedState) => `
  <!doctype html>
  <html>
    <head>
      <title>BlinkTrade - KYC</title>
      <style data-aphrodite>${css.content}</style>
    </head>
    <body>
      <div id="root">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
      </script>
      <script src="/bundle.js"></script>
    </body>
  </html>
`;

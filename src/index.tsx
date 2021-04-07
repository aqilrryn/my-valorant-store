import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './styles/GlobalStyles';
import App from './App';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import splitbee from '@splitbee/web';

const client = new ApolloClient({
  uri: 'https://my-valorant-store-api.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

splitbee.init();

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GlobalStyles />
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) import.meta.hot.accept();

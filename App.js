import 'expo-dev-client';
import * as React from 'react';

import { Provider } from 'react-redux';
import AppRoute from './src/navigation/AppRoute';
import { store } from './src/redux/store';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/Globals/netRequest';


export default function App() {

  return (
    <Provider store={store} >
      <ApolloProvider client={client} >
        <AppRoute />
      </ApolloProvider>
    </Provider>
  );
};

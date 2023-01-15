import React from 'react';
// import MainApp from './src/Main';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/screens';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://jseverywhere.herokuapp.com/api',
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer> 
        <RootNavigator />
      </NavigationContainer> 
    </ApolloProvider>
  );
};

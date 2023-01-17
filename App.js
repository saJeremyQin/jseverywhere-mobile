import React from 'react';
// import MainApp from './src/Main';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/screens';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://jseverywhere.herokuapp.com/api',
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <NavigationContainer> 
          <SafeAreaView style={{flex: 1}}> 
            <RootNavigator />
          </SafeAreaView>
        </NavigationContainer> 
      </ApolloProvider>
    </SafeAreaProvider>
  );
};

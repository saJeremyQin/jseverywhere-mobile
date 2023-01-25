import 'expo-dev-client';
import React from 'react';
// import MainApp from './src/Main';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/screens';
import { 
  ApolloClient, 
  ApolloProvider,
  createHttpLink,
  InMemoryCache 
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const API_URI='https://jseverywhere.herokuapp.com/api';

// Initialize Apollo Client
const uri = API_URI;
const cache = new InMemoryCache();
const httplink = createHttpLink({uri});

// return the headers to the context
const authLink = setContext(async (_, {headers}) => {
  return {
    headers:{
      ...headers,
      authorization: (await SecureStore.getItemAsync('token')) || ''
    }
  };
});

// const client = new ApolloClient({
//   uri: API_URI,
//   cache: new InMemoryCache()
// });

// configure Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httplink),
  cache
});


export default function App() {
  return (
    // <SafeAreaProvider>
      <ApolloProvider client={client}>
        <NavigationContainer> 
          {/* <SafeAreaView style={{flex: 1}}>  */}
            <RootNavigator />
          {/* </SafeAreaView> */}
        </NavigationContainer> 
      </ApolloProvider>
    // </SafeAreaProvider>
  );
};

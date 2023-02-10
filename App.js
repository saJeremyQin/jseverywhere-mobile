import 'expo-dev-client';
import * as React from 'react';
import { createContext, useMemo, useReducer } from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { AuthContext } from './src/Globals/AuthContext';
import { Provider } from 'react-redux';
import AppRoute from './src/navigation/AppRoute';
import { store } from './src/redux/store';

import { ApolloClient, ApolloProvider,createHttpLink,InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import * as SecureStore from 'expo-secure-store';


const Stack = createNativeStackNavigator();
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
      authorization: (await SecureStore.getItemAsync('userToken')) || ''
    }
  };
});

// configure Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httplink),
  cache
});

export default function App() {

  // The useReducer Hook accepts two arguments. 
  // useReducer(<reducer>, <initialState>)
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'LOG_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'LOG_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );


  // React.useEffect(() => {
  //   // Fetch the token from storage then navigate to our appropriate place
  //   const bootstrapAsync = async () => {
  //     let userToken;

  //     try {
  //       // Restore token stored in `SecureStore` or any other encrypted storage
  //       userToken = await SecureStore.getItemAsync('userToken');
  //     } catch (e) {
  //       // Restoring token failed
  //     }
  //     console.log(userToken);

  //     // After restoring token, we may need to validate it in production apps
  //     // This will switch to the App screen or Auth screen and this loading
  //     // screen will be unmounted and thrown away.
  //     dispatch({ type: 'RESTORE_TOKEN', token: userToken });
  //   };

  //   bootstrapAsync();
  // }, []);


  //The useMemo Hook only runs when one of its dependencies update.This can improve performance.
  // const authContext = useMemo(
  //   ()=> ({
  //     logIn: async (data) => {
  //       dispatch({
  //         type:'LOG_IN',
  //         token: data.signIn
  //       });
  //     },
  //     logOut: ()=> {
  //       client.resetStore();
  //       dispatch({type: 'LOG_OUT'});
  //     },
  //     register: async (data) => {
  //       dispatch({
  //         type:'LOG_IN',
  //         token: data.signUp
  //       });
  //     }
  //   }),
  //   []              // [],only runs once, on mount
  // );

  return (
    <Provider store={store} >
      <ApolloProvider client={client} >
        <AppRoute />
      </ApolloProvider>
    </Provider>
  );

};

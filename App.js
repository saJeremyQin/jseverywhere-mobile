import 'expo-dev-client';
import * as React from 'react';
import { createContext, useMemo, useReducer } from 'react';
import {View, Text} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from './src/AuthContext';

import { NavigationContainer } from '@react-navigation/native';
import Loading from './src/components/Loading';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import TabNavigator from './src/screens/index';

const Stack = createNativeStackNavigator();



import { 
  ApolloClient, 
  ApolloProvider,
  createHttpLink,
  InMemoryCache 
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import * as SecureStore from 'expo-secure-store';



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
      // authorization: (state.userToken) || ''
    }
  };
});

// configure Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httplink),
  cache
});



export default function App() {

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


  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      // console.log(userToken);

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    ()=> ({
      logIn: async (data) => {
        dispatch({
          type:'LOG_IN',
          token: data.signIn
        });
      },
      logOut: ()=> {
        client.resetStore();
        dispatch({type: 'LOG_OUT'});
      },
      register: async (data) => {
        dispatch({
          type:'LOG_IN',
          token: data.signUp
        });
      }
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext} >
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            {state.isLoading ? (
              // We haven't finished checking for the token yet
              <Stack.Screen name="loading" component={Loading} />
            ) : state.userToken == null ? (
              <Stack.Group>
                <Stack.Screen
                  name="signIn"
                  component={SignIn}
                  options={{
                    title: 'Sign In',
                    // When logging out, a pop animation feels intuitive
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />
                <Stack.Screen
                  name="signUp"
                  component={SignUp}
                  options={{
                    title: 'Sign Up',
                    // When logging out, a pop animation feels intuitive
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />
              </Stack.Group>
            ) : (
              // User is signed in
              <Stack.Screen name="App" component={TabNavigator} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
       </ApolloProvider>
    </AuthContext.Provider>
  );
};

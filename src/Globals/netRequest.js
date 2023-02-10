import React from "react";

import { ApolloClient, ApolloProvider,createHttpLink,InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import * as SecureStore from 'expo-secure-store';
import { useSelector } from "react-redux";
import { selectUserToken } from "../redux/slices";


const API_URI='https://jseverywhere.herokuapp.com/api';

// Initialize Apollo Client
const uri = API_URI;
const cache = new InMemoryCache();
const httplink = createHttpLink({uri});

const authLink = setContext(async (_, {headers}) => {

    return {
      headers:{
        ...headers,
        authorization: (await SecureStore.getItemAsync('userToken')) || ''   //can't use selector, because the limit of hooks
        // authorization: token
      }
    };
});

// configure Apollo Client
export const client = new ApolloClient({
    link: authLink.concat(httplink),
    cache
});



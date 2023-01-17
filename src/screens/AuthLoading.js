import React,{useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';

import Loading from "../components/Loading";

const AuthLoading = props => {
    const navigation = useNavigation();
    // console.log('I am here in AuthLoading.');
    const checkLoginState = async () => {
        // retrieve the value of the token
        const userToken = await SecureStore.getItemAsync('token');

        // navigate to the app screen if a token is present
        // else navigate to the auth screen
        navigation.navigate( userToken ? 'App':'Auth' );
        // navigation.navigate( userToken ? 'Auth':'App' );
    };

    useEffect(() =>{
        checkLoginState();
    });
    return <Loading />;
};

export default AuthLoading;
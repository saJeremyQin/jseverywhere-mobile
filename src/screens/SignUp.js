import React from "react";
import { useMutation, gql } from "@apollo/client";
import * as SecureStore from 'expo-secure-store';
import {View, Text} from 'react-native';
import UserForm from "../components/UserForm";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";

// define a mutation
const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;



const SignUp = () => {
    const navigation = useNavigation();

    // here only arrow function can be used?
    const storeToken = (tokenStr) => {
        SecureStore.setItemAsync('token', tokenStr).then(
            navigation.navigate('App')
        );
    }

    const [signUp, {data, loading, error}] = useMutation(SIGNUP_USER,{
        onCompleted: data => {
            console.log(data);
            storeToken(data.signUp);
        }    
    });

    if(loading)
        return <Loading />;

    return (
        <React.Fragment>
            {error && <Text>Error-{error.message}</Text>}
            <UserForm action={signUp} formType="SignUp"/>
        </React.Fragment>
    );
};

export default SignUp;
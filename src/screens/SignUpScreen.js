import React from "react";
import { useMutation, gql } from "@apollo/client";
import * as SecureStore from 'expo-secure-store';
import { Text } from 'react-native';
import UserForm from "../components/UserForm";
import Loading from "../components/Loading";

import { useDispatch } from "react-redux";
import { setSignUp } from "../redux/slices";

// define a mutation
const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

const SignUpScreen = () => {
    const dispatch = useDispatch();

    // here only arrow function can be used?
    const storeToken = async (token) => {
        try {
            await SecureStore.setItemAsync('userToken', token);
        } catch (error) {
            console.log(error);         
        }
    };

    const [signUp, {data, loading, error}] = useMutation(SIGNUP_USER,{
        onCompleted: data => {

            storeToken(data.signUp);
            dispatch(setSignUp({
                isLoggedIn: true,
                userToken: data.signUp
            }))
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

export default SignUpScreen;
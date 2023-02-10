import React from "react";
import { View, StyleSheet,Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import JereButton from "../components/JereButton";
import { useNavigation } from "@react-navigation/native";
import UserForm from "../components/UserForm";
import { useMutation, gql, useApolloClient } from "@apollo/client";
import Loading from "../components/Loading";

// import { useContext } from "react";
// import { AuthContext } from "../Globals/AuthContext";
import { useDispatch } from "react-redux";
import { setSignIn } from "../redux/slices";


// define a mutation
const SIGNIN_USER = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password)
    }
`;

const SignInScreen = props => {
    const dispatch = useDispatch();

    // const {logIn} = useContext(AuthContext);
    // store the token with a key value of `token`
    // after the token is stored navigate to the app's main screen
    const storeToken = async (token) => {
        try {
            await SecureStore.setItemAsync('userToken', token);      
        } catch (error) {
            console.log('SignIn save token failure.');         
        }  
    };
    
    const [signIn, {loading, error}] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            console.log(data);
            const userStatus = {
                isLoggedIn: true,
                userToken: data.signIn
            }

            storeToken(data.signIn);
            dispatch(setSignIn(userStatus));
        }
    })

    if(loading) return <Loading />;
    return (
        <React.Fragment>          
            {error && <Text>Error signing in!--{error.message}</Text>}
            <UserForm action={signIn} formType="SignIn" />
        </React.Fragment>
    );
};

export default SignInScreen;
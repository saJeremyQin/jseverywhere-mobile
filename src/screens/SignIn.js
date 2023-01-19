import React from "react";
import { View, StyleSheet,Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import JereButton from "../components/JereButton";
import { useNavigation } from "@react-navigation/native";
import UserForm from "../components/UserForm";
import { useMutation, gql, useApolloClient } from "@apollo/client";
// define a mutation
const SIGNIN_USER = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password)
    }
`;

const SignIn = props => {
    const navigation = useNavigation();
    // store the token with a key value of `token`
    // after the token is stored navigate to the app's main screen
    const storeToken = props => {
        console.log('I am here in storeToken');
        console.log(props);
        SecureStore.setItemAsync('token', props).then(
            navigation.navigate('App')
        );
    };
    
    // const client = useApolloClient();

    const [signIn, {loading, error}] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            console.log(data);
            storeToken(data.signIn);
            navigation.navigate('App');
        }
    })

    return (
        // <View style={styles.container}>
        //     <JereButton title='Sign In' onPress={storeToken} color='skyblue' />
        // </View>
        <>
            <UserForm action={signIn} formType="SignIn" />
            {loading && <Text>Loading...</Text>}
            {error && <Text>Error signing in!--{error.message}</Text>}
        </>
    );
};


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'   
    }
});


export default SignIn;
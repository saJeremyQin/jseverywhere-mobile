import React from "react";
import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import JereButton from "../components/JereButton";
import { useNavigation } from "@react-navigation/native";

const SignIn = props => {
    const navigation = useNavigation();
    // store the token with a key value of `token`
    // after the token is stored navigate to the app's main screen
    const storeToken = () => {
        console.log('I am here in storeToken');
        SecureStore.setItemAsync('token','anything').then(
            navigation.navigate('App')
        );
    };
    return (
        <View>
            <JereButton title='Sign In' onPress={storeToken} color='skyblue' />
        </View>
    );
};

export default SignIn;
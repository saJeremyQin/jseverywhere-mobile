import React from "react";
import { View } from 'react-native';
import JereButton from "../components/JereButton";

const SignIn = props => {
    console.log('I am here in SignIn.');
    return (
        <View>
            <JereButton title='Sign In' color='skyblue' />
        </View>
    );
};

export default SignIn;
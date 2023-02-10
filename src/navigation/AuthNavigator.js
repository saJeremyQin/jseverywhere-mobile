
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "../screens";      // Can be replaced by screens in the future.
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";


const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="signIn"
                component={SignInScreen}
                options={{
                    title: 'Sign In',
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTitleStyle:{
                        fontWeight: 'bold'
                    }
                }}
            />
            <Stack.Screen
                name="signUp"
                component={SignUpScreen}
                options={{
                    title: 'Sign Up',
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTitleStyle:{
                        fontWeight: 'bold'
                    }                 
                }}
            />
        </Stack.Navigator>
    );
}

export default AuthNavigator;
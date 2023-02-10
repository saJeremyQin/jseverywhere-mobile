import *as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from "../components/Loading";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/slices";


const AppRoute = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    // console.log('111111------');
    // console.log(isLoggedIn);

    // Can dispatch to update state, userToken, isLoggedIn, email, username.
    // if(isloading)
    //     return <Loading />;

    return (
        <NavigationContainer>
            {
                isLoggedIn ? <AppNavigator /> : <AuthNavigator />
            }
        </NavigationContainer>

    );

}

export default AppRoute;
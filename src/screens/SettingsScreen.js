import React from "react";
import { useContext } from "react";
import { View,StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import JereButton from "../components/JereButton";
import * as SecureStore from 'expo-secure-store' ;
import { AuthContext } from "../AuthContext";

const SettingsScreen = props => {
    // const navigation = useNavigation();
    // delete the token then navigate to the auth screen
    const {logOut} = useContext(AuthContext);
    const signOut = async () => {
        try {
            await SecureStore.deleteItemAsync('userToken');
            // then(
            //     navigation.navigate('Auth')
            // );
            logOut();
        } catch(error) {
            console.log('Unable delete token from SecureStore.');
        }
    };

    return (
        <View style={styles.container}>
            <JereButton title='SignOut' color='pink' onPress={signOut}/>
         </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'   
    }
});

export default SettingsScreen;
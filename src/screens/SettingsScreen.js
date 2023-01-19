import React from "react";
import { View,StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import JereButton from "../components/JereButton";
import * as SecureStore from 'expo-secure-store' ;

const SettingsScreen = props => {
    const navigation = useNavigation();
    // delete the token then navigate to the auth screen
    const signOut = () => {
        SecureStore.deleteItemAsync('token').then(
            navigation.navigate('Auth')
        );
    };

    return (
        <View style={styles.container}>
            <JereButton title='Settings' color="pink" onPress={signOut}/>
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
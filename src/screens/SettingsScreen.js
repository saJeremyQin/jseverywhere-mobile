import React from "react";
import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import JereButton from "../components/JereButton";
import * as SecureStore from 'expo-secure-store' ;
import { useDispatch } from "react-redux";
import { setSignOut } from "../redux/slices";
import { useSelector } from "react-redux";
import { selectUserName } from "../redux/slices";

const SettingsScreen = props => {
    const dispatch = useDispatch();
    // const {logOut} = useContext(AuthContext);
    const signOut = async () => {
        try {
            await SecureStore.deleteItemAsync('userToken');
            dispatch(setSignOut());
        } catch(error) {
            console.log('Unable delete token from SecureStore.');
        }
    };

    const yourName = useSelector(selectUserName);
    console.log(yourName);

    return (
        <View style={styles.container}>
            <React.Fragment>
                <Text style={{fontSize:22}}>{yourName}, Are you sure to leave?</Text>
                <JereButton title='SignOut' color='pink' onPress={signOut}/>
            </React.Fragment>
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
import React from "react";

import { ActivityIndicator, View, StyleSheet } from "react-native";

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    );
};

const styles =  StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        // backgroundColor:"red"
    }
});

export default Loading;
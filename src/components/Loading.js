import React from "react";

import { ActivityIndicator, View, StyleSheet, Text } from "react-native";

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color='#00ff00' />
            <Text>Loading...</Text>
        </View>
    );
};

const styles =  StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
});

export default Loading;

import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import JereButton from '../components/JereButton';
import NoteFeed from '../components/NoteFeed';


const FeedScreen = () => {

    return (

        <NoteFeed />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:'center'
    }
});

export default FeedScreen;
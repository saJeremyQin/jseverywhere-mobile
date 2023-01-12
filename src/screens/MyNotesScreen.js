
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import JereButton from '../components/JereButton';

const MyNotesScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>My Notes Screen</Text>
            <JereButton 
                onPress={() => navigation.navigate('Note')} 
                title="Go to a note" 
                color={"#882"}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:'center'
    }
});

export default MyNotesScreen;
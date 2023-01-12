
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoteScreen = () => {
    return (
        <View>
            <Text>This is a Note.</Text>
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
export default NoteScreen;
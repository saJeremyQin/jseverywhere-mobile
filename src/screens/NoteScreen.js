
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoteScreen = ({navigation, route}) => {
    const {id} = route.params;

    return (
        <View style={ styles.container }>
            <Text>This is a Note {id}.</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:"gray"
    }
});
export default NoteScreen;
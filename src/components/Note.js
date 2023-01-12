import * as React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const Note = props =>{

    return  (
        <ScrollView style={styles.noteview}>
            <Text style={{fontSize:20}}>{props.note.content}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    noteview:{
        padding:10,
    }
});

export default Note;
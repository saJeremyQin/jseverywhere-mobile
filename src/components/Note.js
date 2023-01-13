import * as React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';

const Note = props =>{


    return  (
        <ScrollView style={styles.noteview}>
            <Text style={styles.text}>
                Note by {props.note.author.username} 
            </Text>
            <Text style={styles.text}>
                Published {' '} 
                {format(new Date(props.note.createdAt), 'MMM do yyyy')}
            </Text>
            <Text style={styles.text}>
                {props.note.content}
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    noteview:{
        padding:10,
    },
    text:{
        fontSize:18,
    }
});

export default Note;
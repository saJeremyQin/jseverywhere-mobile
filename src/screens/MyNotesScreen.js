
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import Loading from '../components/Loading';
import NoteFeed from '../components/NoteFeed';

// our GraphQL query
const GET_MY_NOTES = gql`
    query me {
        me {
            id
            username
            notes {
                id
                createdAt
                content
                favoriteCount
                author {
                    username
                    id
                    avatar
                }
            }
        }
    }
`;

const MyNotesScreen = () => {
    const { data, loading, error } = useQuery(GET_MY_NOTES);

    // useEffect run after every render, React guarantees DOM has been updated by the time it runs Effects.
    // myNoteScreen is not mounted until it is first focused, and switch to other tabs or navigate deeper to 'note'
    // won't cause re-render(react navigation).
    // useEffect(() => {
    //     console.log(`mount user is ${data}`);
    //     return () => {
    //         console.log(`unmount user is ${data}`);
    //     }
    // }, [])     //[data],means invoke after data changes.

    if(loading)
        return <Loading />;
    if(error)
        return <Text>Error loading MyNotes--{error.message}</Text>;

    // if the query is successful and there are notes, return the feed of notes
    // else if the query is successful and there aren't notes, display a message
    if(data.me.notes.length !== 0)  {
        return <NoteFeed notes={data.me.notes} />;
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {data.me.username}, You have no notes yet.
                </Text>
                <Text style={{fontSize:20,paddingTop:50}}>
                    To add, Please visit:
                </Text>
                <Text style={{fontSize:20}}>
                    https://dulcet-gaufre-c3f6b7.netlify.app/
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },   
    text:{
        // flex:1,
        justifyContent:'center',
        alignItems:'center',
        fontSize:22,
        fontWeight:'700'
    }
});

export default MyNotesScreen;
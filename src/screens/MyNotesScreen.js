
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import JereButton from '../components/JereButton';
import { useQuery, gql } from '@apollo/client';
import Loading from '../components/Loading';
import NoteFeed from '../components/NoteFeed';
import { useNavigation } from '@react-navigation/native';

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
    // if the data is loading, our app will display a loading indicator
    if(loading)
        return <Loading />;
    if(error)
        return <Text>Error loading MyNotes.</Text>;

    // if the query is successful and there are notes, return the feed of notes
    // else if the query is successful and there aren't notes, display a message
    // console.log(data.me);
    if(data.me.notes.length !== 0)  {
        return <NoteFeed notes={data.me.notes} />;
    } else {
        return <Text style={styles.text}>No notes yet</Text>;
    }
    // const navigation = useNavigation();
    // // console.log(navigation);
    // If I don't use <NoteFeed> here, for example, show a button then go to <NoteScreen> it is ok.
    // return (
    //     <View style={styles.container}>
    //         <Text>My Notes Screen</Text>
    //         <JereButton 
    //             onPress={() => navigation.navigate('Note',{id:'63b94da5ccf7f90023169c3d'})} 
    //             title="Go to a note" 
    //             color={"#882"}
    //         />
    //     </View>
    // );
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:'center'
    },   
    text:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        fontSize:22,
        fontWeight:'700'
    }
});

export default MyNotesScreen;
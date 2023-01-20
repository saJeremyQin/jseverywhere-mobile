
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import JereButton from '../components/JereButton';
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
    // if the data is loading, our app will display a loading indicator
    if(loading)
        return <Loading />;
    if(error)
        return <Text>Error loading MyNotes.</Text>;

    // if the query is successful and there are notes, return the feed of notes
    // else if the query is successful and there aren't notes, display a message
    console.log(data.me);
    if(data.me.notes.length !== 0)  {
        return <NoteFeed notes={data.me.notes} />;
    } else {
        return <Text>No notes yet</Text>;
    }
        // <View style={styles.container}>
        //     <Text>My Notes Screen</Text>
        //     <JereButton 
        //         onPress={() => navigation.navigate('Note')} 
        //         title="Go to a note" 
        //         color={"#882"}
        //     />
        // </View>
    
};

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent:"center",
//         alignItems:'center'
//     }
// });

export default MyNotesScreen;
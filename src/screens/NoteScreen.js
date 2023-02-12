
import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import Note from '../components/Note';
import Loading from '../components/Loading';

// our note query, which accepts an ID variable
const GET_NOTE = gql`
  query note($id: ID!) {
    note(id: $id) {
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
`;

const NoteScreen = ({navigation, route}) => {
    const {id} = route.params;

    const { data, loading, error } = useQuery(GET_NOTE, {variables:{id}});
    // if the data is loading, our app will display a loading indicator
    if(loading)
        return <Loading />;
    if(error)
        return <Text>Error Note not found.</Text>;

    return (
        <Note note={data.note} />
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'gray'
    }
});
export default NoteScreen;
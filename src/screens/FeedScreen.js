
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import JereButton from '../components/JereButton';
import NoteFeed from '../components/NoteFeed';
// import our Apollo libraries
import { useQuery, gql } from '@apollo/client';
import Loading from '../components/Loading';

// compose our query
const GET_NOTES = gql`
  query notes {
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
`;


const FeedScreen = () => {
    const { data, loading, error } = useQuery(GET_NOTES);
    // if the data is loading, our app will display a loading indicator
    if(loading)
        return <Loading />;
    if(error)
        return <Text>Error loading notes.</Text>;

    // if the query is successful and there are notes, return the feed of notes
    return (
        <NoteFeed notes={data.notes} />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default FeedScreen;
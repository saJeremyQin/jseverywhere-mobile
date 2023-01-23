
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useQuery,gql } from '@apollo/client';
import JereButton from '../components/JereButton';
import Loading from '../components/Loading';
import NoteFeed from '../components/NoteFeed';


const GET_MY_FAVORITES = gql`
  query me {
    me {
      id
      username
      favorites {
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

const FavoritesScreen = ({navigation}) => {

  const { data, loading, error } = useQuery(GET_MY_FAVORITES);
  // if the data is loading, our app will display a loading indicator
  if(loading)
      return <Loading />;
  if(error)
      return <Text>Error loading Favorites.</Text>;
      
  // if the query is successful and there are notes, return the feed of notes
  // else if the query is successful and there aren't notes, display a message
  if(data.me.favorites.length !== 0)
      return <NoteFeed notes={data.me.favorites}/>;
  else
      return <Text style={styles.text}>No favorites yet</Text>;

    // return (
    //     <View style={styles.container}>
    //         <Text>Favorites Screen</Text>
    //         <JereButton 
    //             onPress={() => navigation.navigate('Note')} 
    //             title="Go to a note" 
    //             color={"#221188"}
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

export default FavoritesScreen;
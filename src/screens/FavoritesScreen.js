
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery, gql } from '@apollo/client';
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

  // It is not a good idea to dispatch(setUserInfo()) here, FavoriteScreen is
  // parallel to SettingScreen, and it's lifesytle, mount when get focus
  // doesn't unmount until signOut.
  // A simple tab bar on the bottom of the screen that lets you switch between different routes.
  // Routes are lazily initialized -- their screen components are not mounted until they are first focused.

  const { data, loading, error } = useQuery(GET_MY_FAVORITES);
  // if the data is loading, our app will display a loading indicator
  if(loading)
      return <Loading />;
  if(error)
      return <Text>Error loading Favorites--{error.message}</Text>;
  
  // if the query is successful and there are notes, return the feed of notes
  // else if the query is successful and there aren't notes, display a message
  if(data.me.favorites.length !== 0)
      return <NoteFeed notes={data.me.favorites}/>;
  else
      return (
        <View style={styles.container}>
          <Text style={styles.text}>
              {data.me.username}, You have no favorites yet.
          </Text>
          <Text style={{fontSize:20,paddingTop:50}}>
              To add, Please visit:
          </Text>
          <Text style={{fontSize:20}}>
              https://qindanote.netlify.app/
          </Text>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      alignItems:'center'
    },
    text:{
      justifyContent:'center',
      alignItems:'center',
      fontSize:22,
      fontWeight:'700'
    }
});

export default FavoritesScreen;
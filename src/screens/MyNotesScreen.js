
import React, { useCallback, useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, StyleSheet } from 'react-native';
import JereButton from '../components/JereButton';
import { useQuery, gql } from '@apollo/client';
import Loading from '../components/Loading';
import NoteFeed from '../components/NoteFeed';
// import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/slices';

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
        
    // const dispatch = useDispatch();

    // it is designed to when component unmount, dispatch to setUserInfo
    // But, it doesn't work, because swithch between tabs won't unmount screen components.
    // Then, in useFocusEffect(), setUserInfo, also unsuccessful, due to data.me is not ready
    useEffect(() => {
        console.log(`mount user is ${data}`);
        // dispatch(setUserInfo({userName: data.me.username}));
        return () => {
            console.log(`unmount user is ${data}`);
        }
    }, [])
    // useFocusEffect(
    //     React.useCallback(() => {
    //       // Do something when the screen is focused
    //       dispatch(setUserInfo({userName: data.me.username}));
    
    //       return () => {
    //         // Do something when the screen is unfocused
    //         // Useful for cleanup functions
    //         dispatch(setUserInfo({userName: data.me.username}));
    //       };
    //     }, [])
    // );



    if(loading)
        return <Loading />;
    if(error)
        return <Text>Error loading MyNotes--{error.message}</Text>;

    // dispatch(setUserInfo({userName: data.me.username}));

    // if the query is successful and there are notes, return the feed of notes
    // else if the query is successful and there aren't notes, display a message
    if(data.me.notes.length !== 0)  {
        return <NoteFeed notes={data.me.notes} />;
    } else {
        return <Text style={styles.text}>{data.me.username}, You have no notes yet</Text>;
    }
    
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
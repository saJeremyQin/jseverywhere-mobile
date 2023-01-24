import * as React from 'react';
import { View, FlatList, RefreshControl, Text, Pressable, StyleSheet} from 'react-native';
import Note from './Note';
import { useNavigation } from '@react-navigation/native';

// dummy data
// const notes = [
//     { id: 0, content: 'Giant Steps' },
//     { id: 1, content: 'Tomorrow Is The Question' },
//     { id: 2, content: 'Tonight At Noon' },
//     { id: 3, content: 'Out To Lunch' },
//     { id: 4, content: 'Green Street' },
//     { id: 5, content: 'In A Silent Way' },
//     { id: 6, content: 'Lanquidity' },
//     { id: 7, content: 'Nuff Said' },
//     { id: 8, content: 'Nova' },
//     { id: 9, content: 'The Awakening' }
// ];

const NoteFeed = props => {    
    // only screen components receive navigation prop automatically!
    // if you wish to access the navigation prop in any of your components, you may use the useNavigation hook.
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <FlatList 
                data={props.notes}
                keyExtractor = {({id}) => id.toString()}
                renderItem = {({item}) => (               
                    <Pressable 
                        style={styles.feedview}
                        onPress={() => navigation.navigate('NoteScreen',{id: item.id})}
                    >
                        <Text style={styles.text}>{item.content}</Text>
                    </Pressable>
                )}
            />
        </View>
    );   
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    feedview:{
        height:100,
        overflow:'hidden',
        borderWidth:1,
        borderColor:'#ced0ce',

    },
    text:{   
        fontSize:22,   
    }
});

export default NoteFeed;
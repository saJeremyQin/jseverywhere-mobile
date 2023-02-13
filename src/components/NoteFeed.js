import * as React from 'react';
import { View, FlatList, Text, Pressable, StyleSheet} from 'react-native';
import Note from './Note';
import { useNavigation } from '@react-navigation/native';

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
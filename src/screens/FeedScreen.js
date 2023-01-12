
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import JereButton from '../components/JereButton';


const FeedScreen = ({navigation}) => {

       

    // <FlatList data={items}
    //   // horizontal = {false}           //only horizontal={false} can show multiColumns
    //   // numColumns = {2}
    //   // inverted
    //   // horizontal
    //   keyExtractor = {(item, index) => index.toString()}
    //   refreshControl={<RefreshControl
    //     refreshing={refreshing}
    //     onRefresh={onRefresh}
    //     colors={["#ff00ff"]}
    //   />}

    //   // here iterate an item which is wrapped.
    //   // renderItem = {({item}) => ( 
    //   //   <View style={styles.items} >
    //   //     <Text style={styles.text}>{item.name}</Text>
    //   //   </View>
    //   // )}

    //   // data is wrapped in an item object
    //   renderItem = {(anything) => (
    //     <View style={styles.items}>
    //       <Text style={styles.text}>{anything.item.name}</Text>
    //     </View>
    //   )}
    // />
    return (
        <View style={styles.container}>
            <Text>Feed Screen</Text>
            <JereButton 
                onPress={() => navigation.navigate('Note')} 
                title="Go to a note" 
                color={"#229922"}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:'center'
    }
});

export default FeedScreen;
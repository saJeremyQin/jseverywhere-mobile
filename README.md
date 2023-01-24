# jseverywhere-mobile
This is a refactored version of NoteApp by Expo for javascriptEverywhere, beacuse the original code is outdated. I recorded the process of building this Application 
for future inspection and learning.


1. Start point
in App.js
----------------------------------
export default function App() {
  return <MainApp />;
}
----------------------------------
in Main.js
-------------------------------------------------------------------------------
const Main = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello world!</Text>
    </View>
  );
};

export default Main;
--------------------------------------------------------------------------------

2. To build stackNavigator nested in TabNavigator
The original version provides some ways which have been deprecated possibly, for example:
in Screens/index.js
-------------------------------------------------
export default createAppContainer(TabNavigator);
-------------------------------------------------

in reference to React Navigation 6.x, code like this in Main.js
----------------------------------------------------------------
const Tab = createBottomTabNavigator();
const FeedStack = createStackNavigator();
const MyNotesStack = createStackNavigator();
const FavoritesStack = createStackNavigator();

function FeedStackScreen () {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen name="FeedScreen" component={FeedScreen} />
      <FeedStack.Screen name="NoteScreen" component={NoteScreen} />
    </FeedStack.Navigator>
  );
}

function MyNotesStackScreen () {
  return (
    <MyNotesStack.Navigator>
      <MyNotesStack.Screen name="MyNotesScreen" component={MyNotesScreen} />
      <MyNotesStack.Screen name="Note" component={NoteScreen} />
    </MyNotesStack.Navigator>
  );
}

function FavoritesStackScreen () {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      <FavoritesStack.Screen name="Note" component={NoteScreen} />
    </FavoritesStack.Navigator>
  );
}

const Main = () => {
    return (   
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Feed"
                activeColor='#f0f'
                inactiveColor='#555'
                barStyle={{
                    backgroundColor:'#999'
                }}
                screenOptions={({route}) => ({
                    tabBarIcon:({focused, size, color}) => {
                    let iconName;
                    if( route.name === 'Feed') {
                        iconName = 'home';
                    } else if (route.name === 'MyNotes') { 
                        iconName = 'bed';
                    } else {
                        iconName = 'star'
                    }
                    color = focused ? '#f0f' : '#555';
                    size = focused ? 24 : 20;
                    return <FontAwesome5 name={iconName} size={size} color={color}/>;
                    },
                })}
            >
            <Tab.Screen name='Feed' component={FeedStackScreen} />
            <Tab.Screen name='MyNotes' component={MyNotesStackScreen} />
            <Tab.Screen name='Favorites' component={FavoritesStackScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Main;
-----------------------------------------------------------------------------------------------

Then create FeedScreen.js, MyNotesScreen.js and FavoritesScreen.js in Src/Screens folder, and define Screen(Take FavoritesScreen.js for example)
---------------------------------------------------------------------------------

import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import JereButton from '../components/JereButton';

const FavoritesScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Favorites Screen</Text>
            <JereButton                                               // the button I encapsulated, You can replace with Button
                onPress={() => navigation.navigate('NoteScreen')} 
                title="Go to a note" 
                color={'#221188'}
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

export default FavoritesScreen;
-------------------------------------------------------------------------------------
And Define NoteScreen like this
-----------------------------------------------------

import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoteScreen = () => {
    return (
        <View style={ styles.container }>
            <Text>This is a Note {id}.</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:'gray'
    }
});
export default NoteScreen;
----------------------------------------------------------------------------------
Through these steps, we get a project with three Tabs, inside tab, click a button, go to the NoteScreen.

3. Dummy data for rendering notes.
in FeedScreen
-----------------------------
const FeedScreen = () => {
    return (
        <NoteFeed />
    );
};

---------------------------------
in Src/Components/NoteFeed.js
we define dummy data, and Notice, we can't receive navigation props automatically, because it is a child component of Screen, so useNavigation()

---------------------------------------------------------------
// dummy data
const notes = [
    { id: 0, content: 'Giant Steps' },
    { id: 1, content: 'Tomorrow Is The Question' },
    { id: 2, content: 'Tonight At Noon' },
    { id: 3, content: 'Out To Lunch' },
    { id: 4, content: 'Green Street' },
    { id: 5, content: 'In A Silent Way' },
    { id: 6, content: 'Lanquidity' },
    { id: 7, content: 'Nuff Said' },
    { id: 8, content: 'Nova' },
    { id: 9, content: 'The Awakening' }
];

const NoteFeed = () => {    
    // only screen components receive navigation prop automatically!
    // if you wish to access the navigation prop in any of your components, you may use the useNavigation hook.
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <FlatList 
                data={notes}
                keyExtractor = {({id}) => id.toString()}
                renderItem = {({item}) => (               
                    <Pressable 
                        style={styles.feedview}
                        onPress={() => navigation.navigate('NoteScreen',{id: item.id})}
                    >
                        <Note note={item} />
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
        fontSize:24,   
    }
});

export default NoteFeed;
-----------------------------------------------------------------------
in Note.js
--------------------------------------

const Note = props =>{

    return  (
        <ScrollView style={styles.noteview}>
            <Text style={{fontSize:20}}>{props.note.content}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    noteview:{
        padding:10,
    }
});

export default Note;
-------------------------------------------------------------
Up to now, it works well with dummy data.

4. With Apollo client to request data from server.
first, we define a <RootNavigator> in Src/screens/index.js, use it to replace Main.js
------------------------------------------------------------
const Tab = createBottomTabNavigator();
const FeedStack = createStackNavigator();
const MyNotesStack = createStackNavigator();
const FavoritesStack = createStackNavigator();

function FeedStackScreen () {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen name="FeedScreen" component={FeedScreen} />
      <FeedStack.Screen name="NoteScreen" component={NoteScreen} />
    </FeedStack.Navigator>
  );
}

function MyNotesStackScreen () {
  return (
    <MyNotesStack.Navigator>
      <MyNotesStack.Screen name="MyNotesScreen" component={MyNotesScreen} />
      <MyNotesStack.Screen name="Note" component={NoteScreen} />
    </MyNotesStack.Navigator>
  );
}

function FavoritesStackScreen () {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      <FavoritesStack.Screen name="Note" component={NoteScreen} />
    </FavoritesStack.Navigator>
  );
}
const RootNavigator = () => {
    return (   
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Feed"
                activeColor='#f0f'
                inactiveColor='#555'
                barStyle={{
                    backgroundColor:'#999'
                }}
                screenOptions={({route}) => ({
                    tabBarIcon:({focused, size, color}) => {
                    let iconName;
                    if( route.name === 'Feed') {
                        iconName = 'home';
                    } else if (route.name === 'MyNotes') { 
                        iconName = 'bed';
                    } else {
                        iconName = 'star'
                    }
                    color = focused ? '#f0f' : '#555';
                    size = focused ? 24 : 20;
                    return <FontAwesome5 name={iconName} size={size} color={color}/>;
                    },
                })}
            >
            <Tab.Screen name='Feed' component={FeedStackScreen} />
            <Tab.Screen name='MyNotes' component={MyNotesStackScreen} />
            <Tab.Screen name='Favorites' component={FavoritesStackScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
-------------------------------------------------------------------
Now, Main.js is no useful, and we revise App.js
------------------------------------------------------

import RootNavigator from './src/screens';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://jseverywhere.herokuapp.com/api',
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <RootNavigator />
    </ApolloProvider>
  );
};
-------------------------------------------------------------
it is more clear than using it in Main.js, and if you put it <RootNavigator> in Main.js, it doesn't work. I don't know why.

5. Make request, get notes and note.
In FeedScreen, useQuery
------------------------------------------
import { useQuery, gql } from '@apollo/client';

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
        return <Text>Loading...</Text>;
    if(error)
        return <Text>Error loading notes.</Text>;

    // if the query is successful and there are notes, return the feed of notes
    return (
        <NoteFeed notes={data.notes} />
    );
};
-----------------------------------------------------
In NoteFeed, line 197, revise 
    data={props.notes}
Now, the data is from Server, and the Notes from server is displayed.
How to update the note? Go to NoteScreen, it is similiar.
-------------------------------------------------------
const NoteScreen = ({navigation, route}) => {
    const {id} = route.params;

    const { data, loading, error } = useQuery(GET_NOTE, {variables:{id}});
    // if the data is loading, our app will display a loading indicator
    if(loading)
        return <Text>Loading...</Text>;
    if(error)
        return <Text>Error Note not found.</Text>;

    return (
        <Note note={data.note} />
    );
};
---------------------------------------------------------------
In note, update with a better display, use date-fns, to install it
npm install date-fns --save
then update note..
----------------------------------------------------------------
const Note = props =>{


    return  (
        <ScrollView style={styles.noteview}>
            <Text style={styles.text}>
                Note by {props.note.author.username} 
            </Text>
            <Text style={styles.text}>
                Published {' '} 
                {format(new Date(props.note.createdAt), 'MMM do yyyy')}
            </Text>
            <Text style={styles.text}>
                {props.note.content}
            </Text>
        </ScrollView>
    );
};
----------------------------------------------------------
We can also define different Styles for author name, date and content, But now, I am lasy to do it.
Another question is In NoteFeed,                     
<Note note={item} />
is it a good way? It leads to FeedScreen every note in the flatlist looks lite the note in NoteScreen.
I will revise it later.




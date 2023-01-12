import * as React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritesScreen from './screens/FavoritesScreen';
import FeedScreen from './screens/FeedScreen';
import MyNotesScreen from './screens/MyNotesScreen';
import NoteScreen from './screens/NoteScreen';

import { FontAwesome5 } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();
const FeedStack = createStackNavigator();
const MyNotesStack = createStackNavigator();
const FavoritesStack = createStackNavigator();

function FeedStackScreen () {
  return (
    <FeedStack.Navigator 
      // screenOptions={
      //   {headerShown: false}
      // }
    >
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
            color = focused ? '#f0f' : "#555";
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

const styles = StyleSheet.create({
  containter:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems:"center"
  },
  h1:{
    fontSize: 48,
    color: "pink"
  },
  paragraph:{ 
    marginTop: 24,
    marginBottom: 24,
    fontSize: 18
  }
});

export default Main;

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritesScreen from './FavoritesScreen';
import FeedScreen from './FeedScreen';
import MyNotesScreen from './MyNotesScreen';
import NoteScreen from './NoteScreen';

import { FontAwesome5 } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();
const FeedStack = createStackNavigator();
const MyNotesStack = createStackNavigator();
const FavoritesStack = createStackNavigator();

function FeedStackScreen () {
  return (
    <FeedStack.Navigator screenOptions={
      {headerShown:false}
    } >
      <FeedStack.Screen name="FeedScreen" component={FeedScreen} />
      <FeedStack.Screen name="NoteScreen" component={NoteScreen} />
    </FeedStack.Navigator>
  );
}

function MyNotesStackScreen () {
  return (
    <MyNotesStack.Navigator screenOptions={
      {headerShown:false}
    } >
      <MyNotesStack.Screen name="MyNotesScreen" component={MyNotesScreen} />
      <MyNotesStack.Screen name="Note" component={NoteScreen} />
    </MyNotesStack.Navigator>
  );
}

function FavoritesStackScreen () {
  return (
    <FavoritesStack.Navigator screenOptions={
      {headerShown:false}
    } >
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


export default RootNavigator;
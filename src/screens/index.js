import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritesScreen from './FavoritesScreen';
import FeedScreen from './FeedScreen';
import MyNotesScreen from './MyNotesScreen';
import SettingsScreen from './SettingsScreen';
import NoteScreen from './NoteScreen';
import SignIn from './SignIn';
import AuthLoading from './AuthLoading';


import { FontAwesome5 } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const FeedStack = createStackNavigator();
const MyNotesStack = createStackNavigator();
const FavoritesStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const AuthStack = createStackNavigator();

function FeedStackScreen () {
  return (
    <FeedStack.Navigator
      screenOptions={
        {headerShown:false}
      } 
    >
      <FeedStack.Screen name="FeedScreen" component={FeedScreen} />
      <FeedStack.Screen name="NoteScreen" component={NoteScreen} options={{headerShown:true}}/>
    </FeedStack.Navigator>
  );
}

function MyNotesStackScreen () {
  return (
    <MyNotesStack.Navigator 
    screenOptions={
      {headerShown:false}
    } 
    >
      <MyNotesStack.Screen name="MyNotesScreen" component={MyNotesScreen} />
      <MyNotesStack.Screen name="Note" component={NoteScreen} options={{headerShown:true}} />
    </MyNotesStack.Navigator>
  );
}

function FavoritesStackScreen () {
  return (
    <FavoritesStack.Navigator 
    screenOptions={
      {headerShown:false}
    } 
    >
      <FavoritesStack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      <FavoritesStack.Screen name="Note" component={NoteScreen} options={{headerShown:true}}/>
    </FavoritesStack.Navigator>
  );
}

function SettingsStackScreen () {
  return (
    <SettingsStack.Navigator 
      screenOptions={
      {headerShown:false}
    } 
    >
      <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
      {/* <SettingsStack.Screen name="Note" component={NoteScreen} /> */}
    </SettingsStack.Navigator>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor='#f0f'
      inactiveColor='#555'
      barStyle={{
          backgroundColor:'#999'
      }}
      screenOptions={({route}) => ({
          headerShown: false,
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
      <Tab.Screen name='Feed' component={FeedStackScreen} options={{headerShown: false}} />
      <Tab.Screen name='MyNotes' component={MyNotesStackScreen} options={{headerShown: false}} />
      <Tab.Screen name='Favorites' component={FavoritesStackScreen} options={{headerShown: false}}/>
      <Tab.Screen name='Settings' component={SettingsStackScreen} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      // screenOptions={{headerShown:false}}
    >
      <AuthStack.Screen name='signIn' component={SignIn}></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

const RootNavigator = () => {
    return (  
      <Stack.Navigator 
        initialRouteName='AuthLoading'
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name='AuthLoading' component={AuthLoading} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='Auth' component={AuthStackNavigator}  options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='App' component={TabNavigator}  options={{headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
    );
};


export default RootNavigator;
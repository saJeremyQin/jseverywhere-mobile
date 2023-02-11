import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoritesScreen from './FavoritesScreen';
import FeedScreen from './FeedScreen';
import MyNotesScreen from './MyNotesScreen';
import SettingsScreen from './SettingsScreen';
import NoteScreen from './NoteScreen';
import { FontAwesome5 } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const feedStack = createNativeStackNavigator();
const myNotesStack = createNativeStackNavigator();
const favoritesStack = createNativeStackNavigator();
const settingsStack = createNativeStackNavigator();


function FeedStack () {
  return (
    <feedStack.Navigator
      // screenOptions={
      //   {
      //     title:'Feed',
      //     backgroundColor:'#335511'
      //   }
      // } 
    >
      <feedStack.Screen name="FeedScreen" 
        component={FeedScreen} 
        options={
          {
            title:'Feed',
            headerStyle: {
                backgroundColor: '#334455',
            },
            headerTitleStyle:{
                fontWeight: 'bold'
            }
          }
        }/>
      <feedStack.Screen name="NoteScreen" component={NoteScreen} options={{headerShown:true}}/>
    </feedStack.Navigator>
  );
}

function MyNotesStack () {
  return (
    <myNotesStack.Navigator 
      // screenOptions={
      //   {headerShown:false}
      // } 
    >
      <myNotesStack.Screen 
        name="MyNotesScreen" 
        component={MyNotesScreen} 
        options={
          {
            title:'myNote',
            headerStyle: {
                backgroundColor: '#334455',
            },
            headerTitleStyle:{
                fontWeight: 'bold'
            }
          }
        }
        />
      <myNotesStack.Screen name="NoteScreen" component={NoteScreen} options={{headerShown:true}} />
    </myNotesStack.Navigator>
  );
}

function FavoritesStack () {
  return (
    <favoritesStack.Navigator 
      // screenOptions={
      //   {headerShown:false}
      // } 
    >
      <favoritesStack.Screen 
        name="FavoritesScreen" 
        component={FavoritesScreen} 
        options={
          {
            title:'Favorite',
            headerStyle: {
                backgroundColor: '#334455',
            },
            headerTitleStyle:{
                fontWeight: 'bold'
            }
          }
        }
        />
      <favoritesStack.Screen name="NoteScreen" component={NoteScreen} options={{headerShown:true}}/>
    </favoritesStack.Navigator>
  );
}

function SettingsStack () {
  return (
    <settingsStack.Navigator 
      // screenOptions={
      //   {headerShown:false}
      // } 
    >
      <settingsStack.Screen
        name="SettingsScreen" 
        component={SettingsScreen} 
        options={
          {
            title:'Setting',
            headerStyle: {
                backgroundColor: '#334455',
            },
            headerTitleStyle:{
                fontWeight: 'bold'
            }
          }
        }
        />
    </settingsStack.Navigator>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="MyNotes"
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
          } else if (route.name === 'Favorites') {
              iconName = 'star'
          } else {
              iconName = 'spa'
          }
          color = focused ? '#f0f' : '#555';
          size = focused ? 24 : 20;
          return <FontAwesome5 name={iconName} size={size} color={color}/>;
          },
      })}
    >
      <Tab.Screen 
        name='Feed' 
        component={FeedStack} 
        options={{
          // headerShown: false, 
          title:'Feed',
          headerStyle: {
            backgroundColor: '#28411e',
          },
          headerTitleStyle:{
              fontWeight: 'bold'
          }
        }} />
      <Tab.Screen name='MyNotes' component={MyNotesStack} options={{headerShown: false}} />
      <Tab.Screen name='Favorites' component={FavoritesStack} options={{headerShown: false}}/>
      <Tab.Screen name='Settings' component={SettingsStack} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

export default TabNavigator;



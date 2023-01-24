import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoritesScreen from './FavoritesScreen';
import FeedScreen from './FeedScreen';
import MyNotesScreen from './MyNotesScreen';
import SettingsScreen from './SettingsScreen';
import NoteScreen from './NoteScreen';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AuthLoading from './AuthLoading';


import { FontAwesome5 } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const feedStack = createNativeStackNavigator();
const myNotesStack = createNativeStackNavigator();
const favoritesStack = createNativeStackNavigator();
const settingsStack = createNativeStackNavigator();


function FeedStack () {
  return (
    <feedStack.Navigator
      screenOptions={
        {headerShown:false}
      } 
    >
      <feedStack.Screen name="FeedScreen" component={FeedScreen} />
      <feedStack.Screen name="NoteScreen" component={NoteScreen} options={{headerShown:true}}/>
    </feedStack.Navigator>
  );
}

function MyNotesStack () {
  return (
    <myNotesStack.Navigator 
      screenOptions={
      {headerShown:false}
    } 
    >
      <myNotesStack.Screen name="MyNotesScreen" component={MyNotesScreen} />
      <myNotesStack.Screen name="NoteScreen" component={NoteScreen} options={{headerShown:true}} />
    </myNotesStack.Navigator>
  );
}

function FavoritesStack () {
  return (
    <favoritesStack.Navigator 
      screenOptions={
        {headerShown:false}
      } 
    >
      <favoritesStack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      <favoritesStack.Screen name="NoteScreen" component={NoteScreen} options={{headerShown:true}}/>
    </favoritesStack.Navigator>
  );
}

function SettingsStack () {
  return (
    <settingsStack.Navigator 
      screenOptions={
      {headerShown:false}
    } 
    >
      <settingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </settingsStack.Navigator>
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
      <Tab.Screen name='Feed' component={FeedStack} options={{headerShown: false}} />
      <Tab.Screen name='MyNotes' component={MyNotesStack} options={{headerShown: false}} />
      <Tab.Screen name='Favorites' component={FavoritesStack} options={{headerShown: false}}/>
      <Tab.Screen name='Settings' component={SettingsStack} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

const Auth= () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown:false}}
    >
      <AuthStack.Screen name='signIn' component={SignIn}></AuthStack.Screen>
      <AuthStack.Screen name='signUp' component={SignUp}></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

const RootNavigator = () => {
    return (  
      <Stack.Navigator 
        initialRouteName='AuthLoading'
      >
        <Stack.Screen name='AuthLoading' 
          component={AuthLoading} 
          options={{title:'AuthLoading'}}
        >
        </Stack.Screen>
        <Stack.Screen name='Auth' 
          component={Auth}  
          options={{
            title: 'Auth',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerBackVisible: false,
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
        </Stack.Screen>
        <Stack.Screen name='App' 
          component={TabNavigator}  
          options={{
            title: 'App',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerBackVisible:false,
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >       
        </Stack.Screen>
      </Stack.Navigator>
    );
};


export default RootNavigator;
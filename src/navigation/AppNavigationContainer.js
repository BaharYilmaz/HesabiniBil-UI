import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import RootStackScreen from './RootStackScreen';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import OrtakHesap from '../screens/OrtakHesap';
import Login from '../screens/Login';


const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const initialLoginState = {
  isLoading: true,
  userName: null,
  userToken: null,
};
/*
const HomeStackScreen  = () => {
    return (
        //routing
            <HomeStack.Navigator initialRouteName="Login">
                 <HomeStack.Screen name="Login" component={Login} />

                <HomeStack.Screen name="Home" component={Home} />
                <HomeStack.Screen name="Profile" component={Profile} />
            </HomeStack.Navigator>
    );
};*/
/*const NavigationContainer = () => {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Login">
          <Drawer.Screen name="Home" component={HomeStackScreen} />
          <Drawer.Screen name="Ortak Hesap" component={OrtakHesap} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  };
  */
const AppNavigationContainer = () => {
  const loginState = null;
  return (
    <NavigationContainer>
      { loginState !== null ? (

        <Tab.Navigator initialRouteName="Home">

          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      )
        :
        <RootStackScreen />}
    </NavigationContainer>
  );
};


export default AppNavigationContainer;
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';

const RootStack = createStackNavigator();

const RootStackScreen = () => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="Login" component={Login}/>
        <RootStack.Screen name="SignUp" component={SignUp}/>
    </RootStack.Navigator>
);

export default RootStackScreen;
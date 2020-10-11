import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="Login" component={Login}/>
        <RootStack.Screen name="SignUp" component={SignUp}/>
    </RootStack.Navigator>
);

export default RootStackScreen;
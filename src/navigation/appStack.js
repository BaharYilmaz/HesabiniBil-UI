import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
const AppStack = createStackNavigator();

import Profile from '../screens/Profile'
import Home from '../screens/Home'

const AppStackScreen = () => (
    
    <AppStack.Navigator headerMode='none'  >
       <AppStack.Screen name="Profile" component={Profile} />
        <AppStack.Screen name="Home" component={Home} />
    </AppStack.Navigator>
    
);

export default AppStackScreen;

// const AppStack = StackNavigator({
//     Home: {
//       screen: Home,
//       navigationOptions: {
//         header: null,
//         gesturesEnabled: false
//       }
//     },

//     Profile: {
//       screen: Profile,
//       navigationOptions: {
//         header: null,
//         gesturesEnabled: false
//       }
//     },


//   }, { headerMode: 'none' });


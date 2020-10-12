import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import RootStackScreen from './RootStackScreen';
import SideMenu from './SideMenu';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import OrtakHesap from '../screens/OrtakHesap';
import Login from '../screens/Login';


const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
//const Drawer = createDrawerNavigator();

import { Drawer } from 'native-base';

import Header from '../screens/Header';
import SideBar from './SideBar';


// const initialLoginState = {
//   isLoading: true,
//   userName: null,
//   userToken: null,
// };
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
// const AppNavigationContainer = () => {
//     return (
//       <NavigationContainer>
//         <Drawer.Navigator initialRouteName="Home">
//           <Drawer.Screen name="Home" component={Home} />
//           <Drawer.Screen name="Ortak Hesap" component={OrtakHesap} />
//         </Drawer.Navigator>
//       </NavigationContainer>
//     );
//   };

export default class AppNavigationContainer extends Component {

   closeDrawer = () => {
    this.drawer._root.close()
  };
  
   openDrawer = () => { this.drawer._root.open() };
  render() {
    const loginState = 1;

  return (
    <Drawer
      ref={(ref) => { this.drawer = ref; }}
      content={<SideBar />}
      onClose={() => this.closeDrawer()} >

      <Header
openDrawer={this.openDrawer.bind(this)}
      />
      <NavigationContainer>
        {loginState !== null ? (


          <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>

        )
          :
          <RootStackScreen />
        }
      </NavigationContainer>
    </Drawer>
  );
};
}

//export default AppNavigationContainer;
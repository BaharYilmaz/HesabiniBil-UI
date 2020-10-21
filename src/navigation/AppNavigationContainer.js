import React, { useContext, useEffect } from 'react';
import { AppContext } from '../provider/AppProvider'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import RootStackScreen from './RootStackScreen';
import AppStack from './drawer';

import SideMenu from './SideMenu';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import OrtakHesap from '../screens/OrtakHesap';
import Login from '../screens/Login';


const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const Drawer = createDrawerNavigator();

//
//import { Drawer } from 'native-base';

import Header from '../screens/Header';
import SideBar from './SideBar';
import AppStackScreen from './appStack';
import Sidebar from './SideBar';

import LogOut from '../components/LogOut'
import DeleteAccount from '../components/DeleteAccount'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
// const AppNavigationContai ner = () => {
//     return (
//       <NavigationContainer>
//         <Drawer.Navigator initialRouteName="Home">
//           <Drawer.Screen name="Home" component={Home} />
//           <Drawer.Screen name="Ortak Hesap" component={OrtakHesap} />
//         </Drawer.Navigator>
//       </NavigationContainer>
//     );
//   };

const AppNavigationContainer = () => {
  // constructor(props) {
  //   super(props);
  //   //this.state = { loginState: 1 };
  // }
  //const [loginState, changeLoginState] = useState(1);

  // closeDrawer = () => { this.drawer._root.close() };

  // openDrawer = () => { this.drawer._root.open() };

  //const {loginState} = this.state;
  //const dimensions = useWindowDimensions();

  const login = useContext(AppContext);
  return (


    <NavigationContainer>
      {login.loginState !== 0 ? (
        <Drawer.Navigator initialRouteName="Home"
          drawerContent={(props) => <SideBar {...props} />}
          drawerContentOptions={{
            itemStyle: { marginVertical: 5 },
            drawerType: 'slide',
            drawerStyle: {
              backgroundColor: 'blue',
              width: 240,
            },
            overlayColor: "transparent"

          }} //headerMode="screen"
          // screenOptions={{
          //   headerTintColor: 'white',
          //   headerStyle: { backgroundColor: 'tomato' },
          // }}
          screenOptions={{
            header: () => (
              <Header />
            ),
          }}
        >

          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="LogOut" component={LogOut} />
          <Drawer.Screen name="DeleteAccount" component={DeleteAccount} />

        </Drawer.Navigator>

        // <Drawer 
        //   ref={(ref) => { this.drawer = ref; }}
        //   onClose={() => this.closeDrawer()}
        //   content={<Sidebar/>}
        //    >
        //      {/* <AppStack/> */}
        //   <Header
        //     openDrawer={this.openDrawer.bind(this)}
        //   />

        // <AppStackScreen />

        // {/* // <Tab.Navigator initialRouteName="Home">
        // //   <Tab.Screen name="Home" component={Home} />
        // //   <Tab.Screen name="Profile" component={Profile} />
        // // </Tab.Navigator>  */}
        // // </Drawer>
      )
        :
        <RootStackScreen />
      }
    </NavigationContainer>

  );
};


export default AppNavigationContainer;
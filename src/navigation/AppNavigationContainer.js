import React, { useContext, useEffect } from 'react';
import { AppContext } from '../provider/AppProvider'
import { AsyncStorage } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import RootStackScreen from './RootStackScreen';


import Home from '../screens/Home';
import Profile from '../screens/Profiles/Profile';
import CommonAccounts from '../screens/Account/CommonAccounts';
import CreateHomeAccount from '../screens/Account/CreateHomeAccount';
import DebtTracking from '../screens/Debt/DebtTracking';
import HomeAccount from '../screens/Account/HomeAccount';


const Tab = createBottomTabNavigator();
const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();

//
//import { Drawer } from 'native-base';

import Header from '../components/Header';
import SideBar from './SideBar';

import DeleteAccount from '../components/Modals/DeleteAccount'
import LogOut from '../components/LogOut'


// const initialLoginState = {
//   isLoading: true,
//   userName: null,
//   userToken: null,
// };

const AppStackScreen = () => {
  return (

    <AppStack.Navigator headerMode='none'  >
      <AppStack.Screen name="CommonAccounts" component={CommonAccounts} />
      <AppStack.Screen name="CreateHomeAccount" component={CreateHomeAccount} />
      <AppStack.Screen name="HomeAccount" component={HomeAccount} />
      <AppStack.Screen name="DebtTracking" component={DebtTracking} />
      <AppStack.Screen name="Profile" component={Profile} />

    </AppStack.Navigator>
  );
};


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
      {login.loginState ? (
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

          <Drawer.Screen name="Home" component={AppStackScreen} />
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
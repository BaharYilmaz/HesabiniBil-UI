import React from 'react';

import {
    createDrawerNavigator, DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';

import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import OrtakHesap from '../screens/OrtakHesap';


const Drawer = createDrawerNavigator();
// function CustomDrawerContent(props) {
//     return (
//         <DrawerContentScrollView {...props}>
//             <DrawerItemList {...props} />
//             <DrawerItem
//                 label="Toggle drawer"
//                 onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
//             />
//         </DrawerContentScrollView>
//     );
// }
const SideMenu = ({ navigation }) => (
    <Drawer.Navigator initialRouteName="OrtakHesap">
        <Drawer.Screen name="OrtakHesap" component={OrtakHesap} />
        <Drawer.Screen name="SignUp" component={SignUp} />

    </Drawer.Navigator>



);

export default SideMenu;
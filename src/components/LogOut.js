import React, { useContext } from 'react';
import { AppContext } from '../provider/AppProvider'
import { Dimensions, View, TextInput } from 'react-native';

const LogOut = () => {
    const login = useContext(AppContext);
    login.handleLogOut();
    
    return (
        <View>
            
        </View>
    );
};

export default LogOut;
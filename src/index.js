
import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import AppContainer from './navigation/AppNavigationContainer';
import  {AppProvider}  from './provider/AppProvider'

const App = () => {
    return (
        <AppProvider>

            <SafeAreaView style={{ flex: 1 }}>
                <AppContainer />
            </SafeAreaView>
        </AppProvider>

    );

}

export default App;
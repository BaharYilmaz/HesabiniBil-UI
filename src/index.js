
import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import AppContainer from './navigation/AppNavigationContainer';

class App extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <AppContainer />
            </SafeAreaView>
        );
    }
}

export default App;
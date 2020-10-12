import React, { Component } from 'react';
import { View, Text } from 'react-native';


class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(props);
      
    }


    render() {
        
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Profile Screen</Text>
               
            </View>
        );
    }
}

export default Profile;
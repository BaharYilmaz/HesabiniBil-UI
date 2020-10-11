import React, { Component } from 'react';
import { View, Text } from 'react-native';


class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(props);
      
    }


    render() {
        const {username, password} = this.props.route.params;
        
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Profile Screen</Text>
                <Text>username: {username}</Text>
                <Text>password: {password}</Text>
            </View>
        );
    }
}

export default Profile;
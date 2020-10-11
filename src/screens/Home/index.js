import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity,TouchableWithoutFeedback } from 'react-native';


class Home extends Component {
    constructor(props) {
        super(props);
    }

  
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Home</Text>
                   
                {/* <Button title='hh'/> */}
               <TouchableOpacity 
                 onPress={() =>this.props.navigation.navigate('Profile', {
                    username: 'Safa',
                    password: '242141',
                  })}
                >
                    <Text>Go to Profile</Text>
                </TouchableOpacity> 
            </View>
        );
    }
}

export default Home;
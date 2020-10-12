import React, { Component } from 'react';
import {
  Text,
} from 'react-native';


import {Content} from 'native-base';

export default class Sidebar extends Component {
  render() {
    return (
          <Content style={{backgroundColor:'#FFFFFF'}}>
            <Text>Drawer</Text>
          </Content>
    );
  }
}

module.exports = Sidebar;
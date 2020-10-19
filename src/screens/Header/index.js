import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

import {Header,Left,Button,Icon,Right,Body,Title} from 'native-base';

export default class AppHeader extends Component {
  render() {
    return (
      <Header>
       <Left>
       <Button transparent
              //onPress={()=>this.props.navigation.openDrawer()}
       >
         <Icon name='menu' />
       </Button>
       </Left>
       <Body>
       <Title>Hesabını Bil</Title>
       </Body>
       <Right>
         <Button transparent>
           <Icon name='help' />
         </Button>
       </Right>
     </Header>
    );
  }
}

module.exports = AppHeader;
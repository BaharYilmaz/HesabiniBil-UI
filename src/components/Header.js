import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Header, Left, Button, Right, Body, Title } from 'native-base';
import { Icon } from 'react-native-elements';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AppHeader = (props) => {
  const navigation = useNavigation();
  return (
    //   <Header>
    //    <Left>
    //    <Button transparent
    //           //onPress={()=>this.props.navigation.openDrawer()}
    //    >
    //      <Icon name='menu' />
    //    </Button>
    //    </Left>
    //    <Body>
    //    <Title>Hesabını Bil</Title>
    //    </Body>
    //    <Right>
    //      <Button transparent>
    //        <Icon name='help' />
    //      </Button>
    //    </Right>
    //  </Header>
    <Header>
      <Left>
        <Button transparent onPress={() => navigation.navigate(props.screenName)}>
          <Icon name='angle-left' type='font-awesome' size={hp('5%')} color="white" />
        </Button>
      </Left>
      <Body />
    </Header>
  );
}
export default AppHeader;


import React, { Component } from 'react';

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, Header, ListItem, Left, Separator, Button, Right, Footer, FooterTab, Switch, Text, Body, Title, Subtitle } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Profile from '../screens/Profile'
//import { StackNavigator } from  'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation; 

  }
  render() {
    //const{navigation}=this.props;
    return (
      <Container >
        <Header span>
          <Body>
            <Icon name='account-circle' size={50} color="white"></Icon>
            <Title>  Bahar Yılmaz</Title>
          </Body>
        </Header>

        <Content style={{
          backgroundColor: '#FFFFFF'
        }}>
          <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
        
            <TouchableOpacity style={[styles.menu, { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 5 }]} onPress={() => this.navigation.navigate('Home')}>
              <Icon name='home' size={24} />
              <Text style={styles.menuText} type='h5White'>Ana Sayfa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menu} onPress={() =>this.navigation.navigate('Profile')}>
              <Icon name='account' size={24} />
              <Text style={styles.menuText} type='h5White'>Hesabım</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menu2}>
              <Icon name='logout' size={24} />
              <Text style={styles.menuText} type='h5White'>Çıkış Yap</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menu2}>
              <Icon name='delete' size={24} />
              <Text style={styles.menuText} type='h5White'>Hesabı Sil</Text>
            </TouchableOpacity>

          </View>

        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  sideMenu: {
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // bottom: 0,
    // left: 0,
    // width: SideMenuWidth,
    // backgroundColor: 'transparent'

  },
  sideMenuTitle: {
    //marginBottom: 30
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 20,
    paddingVertical: 10,

  },
  menu2: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 20,
    paddingVertical: 10,

  },
  menuText: {
    marginLeft: 20
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },


})


export default Sidebar;

'use strict';
import React, { Component, useContext } from 'react';
import { AppContext } from '../../../provider/AppProvider';

import { AppRegistry, Dimensions, StyleSheet, Alert, Text, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { Icon } from 'react-native-elements';
import { Container, Header, Left, Right, Button} from 'native-base';


const AddBill = (props) => {

  const state = useContext(AppContext);

  const [image, setImage] = React.useState('');
  const params = props.route.params;

  auth().signInAnonymously()


  const uploadImage = async () => {
    const filename = image.substring(image.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? image.replace('file://', '') : image;


    const imageRef = storage().ref().child(filename)
    imageRef.putFile(uploadUri, { contentType: 'image/jpeg' }).then(function () {
      return imageRef.getDownloadURL();
    }).then(function (url) {
      console.log("Image url", { url: url });
      let model={
        ortakHesapID:params.account,
        alisverisFoto:url
      }
      state.addBill(model)
      Alert.alert(
        'Photo uploaded!',
        'Your photo has been uploaded to Firebase Cloud Storage!'
      );
    }).catch(function (error) {
      console.log("Error while saving the image.. ", error);
    });



   
    setImage('');
  };


  const takePicture = async (camera) => {
    try {
       const options = { fixOrientation  :true };
      const { uri } = await camera.takePictureAsync(options);
      setImage(uri);

    } catch (err) {
      console.log('err: ', err);
    }
  };

  const renderImage = () => {
    const { height: screenHeight } = Dimensions.get('window');


    return (

      <View >
        <View >
          <ImageBackground
            source={{ uri: image }} imageStyle={{ resizeMode: 'contain' }}
            style={{ width: '100%', height: screenHeight * 0.7, transform: [{ rotate: '90deg' }] }} />
        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: wp('15%') }}>

          <Left style={{ margin: wp('2%') }}>
            <Button block rounded danger onPress={() => setImage('')}>
              <Text style={{ color: 'white' }} >İptal</Text>
            </Button>
          </Left>
          <Right style={{ margin: wp('2%') }}>
            <Button block rounded info onPress={uploadImage}>
              <Text style={{ color: 'white' }} >Fotoğrafı Tara</Text>
            </Button>

          </Right>
        </View>
      </View>
    );
  }
  const renderCamera = () => {

    return (
      <View style={styles.container}>
        <RNCamera

          style={styles.preview}
          captureAudio={false}
          type={RNCamera.Constants.Type.back}
          
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {/* <View style={{ backgroundColor: 'dimgray', opacity: 0.5, width: wp('100%'), alignItems: 'center' }}>
            <TouchableOpacity onPress={this.takePicture(camera)} style={{ width: wp('15') }} >
              <Icon name='camera' type='font-awesome' style={{ padding: wp('2'), width: wp('15') }} size={hp('5%')} color="white" />
            </TouchableOpacity>
          </View> */}
          {({ camera, status, recordAudioPermissionStatus }) => {
            return (
              <View style={{ backgroundColor: 'dimgray', opacity: 0.5, width: wp('100%'), alignItems: 'center' }}>
                <TouchableOpacity onPress={() => takePicture(camera)} style={{ width: wp('15') }}>
                  <Icon name='camera' type='font-awesome' style={{ padding: wp('2'), width: wp('15') }} size={hp('5%')} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('AddBillManuel',{ account: params.account})} style={{ width: wp('15') }}>
                <Text>Manuel Ekle</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
    )
  }




  return (

    <Container>
      <Header />
      { image ? renderImage() : renderCamera()}

    </Container >

  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
});
export default AddBill;
'use strict';
import React, { Component } from 'react';
import { AppRegistry, Dimensions, StyleSheet, Alert, Text, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { Icon } from 'react-native-elements';
import { Container, Header, Left, Right,Button } from 'native-base';

class AddBill extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      uploading: false,
      transferred: 0
    }
  }


  componentDidMount() {
    auth().signInAnonymously()
  }

  uploadImage = async () => {

    const { image } = this.state;
    const filename = image.substring(image.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? image.replace('file://', '') : image;

    this.setState({ uploading: true, transferred: 0 });

    const imageRef = storage().ref().child(filename)
    imageRef.putFile(uploadUri, { contentType: 'image/jpeg' }).then(function () {
      return imageRef.getDownloadURL();
    }).then(function (url) {
      console.log("Image url", { url: url });
    }).catch(function (error) {
      console.log("Error while saving the image.. ", error);
    });


    this.setState({ uploading: false });

    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!'
    );
    this.setState({ image: null });
  };


  takePicture = async () => {
    try {
      // const options = { quality: 0.5, pauseAfterCapture: true };
      const { uri } = await this.camera.takePictureAsync();
      this.setState({ image: uri });

    } catch (err) {
      console.log('err: ', err);
    }
  };

  renderImage() {
    const { image } = this.state;
    const { height: screenHeight } = Dimensions.get('window');


    return (

      <View >
        <View >
          <ImageBackground
            source={{ uri: image }} imageStyle={{ resizeMode: 'contain' }}
            style={{ width: '100%', height: screenHeight * 0.7, transform: [{ rotate: '90deg' }] }} />
        </View>
        <View style={{ flexDirection: 'row',marginHorizontal:wp('15%') }}>
           
           <Left style={{margin:wp('2%') }}>
           <Button block rounded danger onPress={() => this.setState({ image: null })}>
              <Text style={{color:'white' }} >İptal</Text>
            </Button>
           </Left>
                     <Right style={{margin:wp('2%') }}>
            <Button block rounded info onPress={this.uploadImage}>
              <Text style={{color:'white' }} >Fotoğrafı Tara</Text>
            </Button>

          </Right>
        </View>
      </View>
    );
  }

  renderCamera() {

    return (
      <View style={styles.container}>
        <RNCamera
          ref={(cam) => {
            this.camera = cam;
          }}
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
           
          <TouchableOpacity onPress={this.takePicture.bind(this)}>
            <Text style={styles.capture}>[ ÇEK ]</Text>
          </TouchableOpacity>
        </RNCamera>
      </View>
    )
  }
  render() {

    return (

      <Container>
        <Header />
        {this.state.image ? this.renderImage() : this.renderCamera()}

      </Container>

    );
  }
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
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View, Image, ImageBackground
} from 'react-native';
import Camera from 'react-native-camera';
import { RNCamera } from 'react-native-camera';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class AddBill extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  takePicture = async () => {
    try {
      const options = { quality: 0.5, pauseAfterCapture: true };
      const { uri } = await this.camera.takePictureAsync();
      this.setState({ data: uri });
      // CameraRoll.saveToCameraRoll(data.uri, "photo")
    } catch (err) {
      console.log('err: ', err);
    }
  };

  renderImage() {
    const { data } = this.state;
    console.log(data)
    const image = { uri: "https://reactjs.org/logo-og.png" };

    return (

      <View style={{ marginTop: 70 }}>
        <ImageBackground
          source={{ uri: data}} imageStyle={{ resizeMode: 'stretch' }}
          style={{width: '50%', height: '50%'}}        />

        <Text onPress={() => this.setState({ data: null })}>Cancel</Text>
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
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </RNCamera>
      </View>
    )
  }
  render() {

    return (

      this.state.data ? this.renderImage() : this.renderCamera()



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
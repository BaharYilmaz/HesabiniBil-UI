'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,Alert,
  Text,Progress,
  TouchableHighlight,TouchableOpacity,
  View, Image, ImageBackground
} from 'react-native';
import Camera from 'react-native-camera';
import { RNCamera } from 'react-native-camera';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
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

    const  {image} = this.state;
    console.log("--------------------",image)
    const filename = image.substring(image.lastIndexOf('/') + 1);
    console.log("------////-------",filename)

    const uploadUri = Platform.OS === 'ios' ? image.replace('file://', '') : image;
    console.log("******************",uploadUri)

    this.setState({ uploading: true, transferred: 0 });

    const task = storage()
      .ref(filename)
      .putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      this.setState({
        transferred: Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      });


    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    this.setState({ uploading: false });

    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!'
    );
    this.setState({ image: null });
  };

  takePicture = async () => {
    try {
      const options = { quality: 0.5, pauseAfterCapture: true };
      const { uri } = await this.camera.takePictureAsync();
      this.setState({ image: uri });

      // CameraRoll.saveToCameraRoll(data.uri, "photo")
    } catch (err) {
      console.log('err: ', err);
    }
  };

  renderImage() {
    const { image } = this.state;

    return (

      <View style={{ marginTop: 70 }}>
        <ImageBackground
          source={{ uri: image }} imageStyle={{ resizeMode: 'stretch' }}
          style={{ width: '50%', height: '50%' }} />

        <Text onPress={() => this.setState({ image: null })}>Cancel</Text>

        {this.state.uploading ? (
          <View >
            {/* <Progress.Bar progress={this.state.transferred} width={300} /> */}
          </View>
        ) : (
            <TouchableOpacity onPress={this.uploadImage}>
              <Text >Upload image</Text>
            </TouchableOpacity>
          )}
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

      this.state.image ? this.renderImage() : this.renderCamera()



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
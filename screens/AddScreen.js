import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';
// import { uuid } from 'react-native-uuid';


export default class AddScreen extends React.Component {
  static navigationOptions = {
    title: 'Add',
  };

  state = {
    imageUri: null,
  };

  render() {
    let { imageUri } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._launchCameraRollAsync}
        />
        {imageUri &&
          <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  _launchCameraRollAsync = async () => {
    let {status} = await Expo.Permissions.askAsync(Expo.Permissions.CAMERA_ROLL);

    if (status !== 'granted') {
      console.error("Camera Roll permission not granted");
      return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true
    });
    // console.log(result);
    // console.log(Date.now());

    if (!result.cancelled) {
      this.setState({ imageUri: result.uri });

      const body = {
        "messages": [
          {
            "msg_id": "test-img-from-frontend",
            "img_id": "",
            "img": result.base64,
            "timestamp": Date.now(),
            "width": result.width,
            "height": result.height,
            "Schema": "Image"
          }
        ]
      }

      fetch('https://8gqr11z8n1.execute-api.us-east-1.amazonaws.com/v01/img', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          body
        ),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.messages[0].img_id);
      })
      .catch((error) => {
        console.error(error);
      });
      
    }
  };
}
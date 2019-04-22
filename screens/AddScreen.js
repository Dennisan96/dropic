import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';


export default class AddScreen extends React.Component {
  static navigationOptions = {
    title: 'Add',
  };

  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._launchCameraRollAsync}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  _launchCameraRollAsync = async () => {
    let {status} = await Expo.Permissions.askAsync(Expo.Permissions.CAMERA_ROLL);

    if (status !== 'granted') {
      console.error("Camera Roll permission not granted");
      return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync();
    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}
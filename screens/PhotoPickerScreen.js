import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Overlay } from 'react-native-elements';
import { ImageManipulator, Icon } from 'expo';

import CameraRollPicker from 'react-native-camera-roll-picker';

import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import { uploadImages } from '../components/api/api';


const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={Icon.Ionicons} iconSize={23} color="#2f95dc" />
);

export default class PhotoPickerScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
      title: 'Camera Roll',
      headerRight: (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item title="Done" onPress={params.handleDoneBtn} />
        </HeaderButtons>
      )
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      num: 0,
      selected: [],
      uploading: false
    };

    this.getSelectedImages = this.getSelectedImages.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
        handleDoneBtn: async () => {

          if (this.state.selected) {
            this.setState({ uploading: true });

            const pArray = this.state.selected.map(async item => {
              const res = await ImageManipulator.manipulateAsync(
                item.uri,
                [],
                { compress: 0.5, base64: true },
              );
              
              const timestamp = Date.now();
              const msg = await {
                msg_id: timestamp,
                img_id: timestamp,
                timestamp: timestamp,
                height: res.height,
                width: res.width,
                Schema: 'Image',
                img: res.base64
              }

              return msg;
            });

            const msgList = await Promise.all(pArray)
            uploadImages(msgList, 'user-uuid-fake-sheldon', navigation.getParam('tripId'))
            .then(() => {
              this.setState({ uploading: false });
              navigation.goBack();
            });
          }
        }
    });
  }

  getSelectedImages(images, current) {
    var num = images.length;

    this.setState({
      num: num,
      selected: images,
    });

    // console.log(current.uri);
    // console.log(this.state.selected);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text}>
            <Text style={styles.bold}> {this.state.num} </Text> images has been selected
          </Text>
        </View>
        <CameraRollPicker
          groupTypes='SavedPhotos'
          maximum={3}
          selected={this.state.selected}
          assetType='Photos'
          imagesPerRow={4}
          imageMargin={1}
          callback={this.getSelectedImages} />
        <Overlay 
          isVisible={this.state.uploading}
          width="auto"
          height="auto"
        >
          <Text>Uploading...</Text>
        </Overlay>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6AE2D',
  },
  content: {
    marginTop: 0,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    alignItems: 'center',
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
});

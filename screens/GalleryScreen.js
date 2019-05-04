import React from 'react';
import Gallery from 'react-native-image-gallery';


export default class GalleryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('tripName') + " Gallery",
    }
  };

  render() {
    const { navigation } = this.props;

    return (
      <Gallery
        style={{ flex: 1, backgroundColor: 'black' }}
        images={navigation.getParam('images')}
        initialPage={navigation.getParam('index')}
      />
    );
  }
};          
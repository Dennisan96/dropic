import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';


export default class GalleryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('tripName') + " Gallery",
    }
  };

  render() {
    const { navigation } = this.props;

    return (
      <ImageViewer
        // style={{ flex: 1, backgroundColor: 'black' }}
        imageUrls={navigation.getParam('imageUrls')}
        index={navigation.getParam('index')}
        enableSwipeDown={true}
        onCancel={navigation.goBack}
        swipeDownThreshold={180}
        // renderArrowLeft
        // renderArrowRight
      />
    );
  }
};          
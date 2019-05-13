import React from 'react';
import { TouchableOpacity, StyleSheet, Image, RefreshControl } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'expo';
import { listUserPhotoes } from '../components/api/api';


export default class TripScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'My Photoes',
    }
  };

  state = {
    images: [],
    refreshing: false
  }

  _onRefresh = () => {
    this.refreshList();
  }

  refreshList = () => {
    listUserPhotoes(global.USERID)
    .then(res => {
      const images = []
      console.log(res);
      if (res) {
        res.forEach(item => {
          const bucket = item.addressBucket;
          const key = item.addressKey;
          images.push({source: {uri: `https://s3.amazonaws.com/${bucket}/${key}`}})
        })
      }
      // console.log(images);
      this.setState({ images: images, refreshing: false })
    });
  }

  componentWillMount = () => {
    this.refreshList();
  }

  render() {
    const { navigation } = this.props;
    const { images } = this.state;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <FlatGrid
          itemDimension={120}
          items={images}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          spacing={1}
          renderItem={({ item, index }) => (
            <TouchableOpacity 
              key={navigation.getParam('tripId')} 
              style={styles.itemContainer}
              onPress={() => navigation.push(
                'Gallery',
                {
                  tripName: 'My Photoes',
                  imageUrls: images.map(image => ({'url': image.source.uri})),
                  index: index
                }
              )}
            >
              <Image source={item.source} resizeMode = {'cover'} style={styles.imgItem}/>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  gridView: {
    marginTop: 0,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    // alignItems: 'stretch',
    borderRadius: 0,
    padding: 0,
    height: 120,
  },
  imgItem: {
    width: '100%',
    height: '100%'
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  }
});
import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'expo';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';


const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={Icon.Ionicons} iconSize={23} color="#2f95dc" />
);

export default class TripScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('tripName'),
      headerRight: (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item 
            title="add photo" 
            iconName="ios-add-circle-outline" 
            onPress={() => navigation.push('PhotoPicker', {
              tripName: navigation.getParam('tripName'),
              tripId: navigation.getParam('tripId')
            })} 
          />
          <Item 
            title="invite friend" 
            iconName="ios-person-add" 
            onPress={() => navigation.push('InviteFriends', {
              tripName: navigation.getParam('tripName'),
              tripId: navigation.getParam('tripId')
            })} 
          />
        </HeaderButtons>
      )
    }
  };

  render() {
    const { navigation } = this.props;

    const images = [
      { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
      { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
      { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
      { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } },
      { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
      { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
      { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
      { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } },
      { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
      { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
      { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
      { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
    ];


    return (
      <ScrollView>
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
                  tripName: navigation.getParam('tripName'),
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
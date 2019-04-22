import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import FA_Icon from '../components/FontAwesomeIcons';
import { WebBrowser } from 'expo';


import { MonoText } from '../components/StyledText';


export default class SharesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Sharing Trips',
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
        >
          <FA_Icon name={'user-secret'} />
        </TouchableOpacity>
      )
    }
  };

  tripList = [
    {
      tripId: "trip01",
      tripName: "NYC Trip",
      tripPeriod: "Mar 20 - Mar 26 2019",
      tripBuddies:  ["Zheng Zhi", "An Da", "Chen Pengyu", "Hu Xin"]
    },
    {
      tripId: "trip02",
      tripName: "SF Trip",
      tripPeriod: "Jan 20 - Jan 26 2019",
      tripBuddies:  ["An Da", "Zhang Chi"]
    }
  ];

  render() {
    let tripItems = []
    for (let i = 0; i < this.tripList.length; i++) {
      const tripInfo = this.tripList[i];
      let buddiesList = "";
      for (let j = 0; j < tripInfo.tripBuddies.length; j++) {
        if (j !== 0) {
          buddiesList += ", ";
        }
        buddiesList += tripInfo.tripBuddies[j];
      } 

      tripItems.push(
        <TouchableOpacity 
          key={tripInfo.tripId} 
          style={styles.itemContainer}
          onPress={() => this.props.navigation.push(
            'Trip',
            {tripName: tripInfo.tripName}
          )}
        >
          <Text>
            {tripInfo.tripName + ": " + tripInfo.tripPeriod}
          </Text>
          <Text>
            {buddiesList}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
        {tripItems}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3'
  },
  itemContainer: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginBottom: 5
  },
});

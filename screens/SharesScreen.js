import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import FA_Icon from '../components/FontAwesomeIcons';
import { Input, Overlay } from 'react-native-elements';

import { Icon } from 'expo';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';

import { createNewTrip, getTripList } from '../components/api/api';


const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={Icon.Ionicons} iconSize={23} color="#2f95dc" />
);


export default class SharesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
      title: 'Sharing Trips',
      headerBackTitle: ' ',
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
        >
          <FA_Icon name={'user-secret'} />
        </TouchableOpacity>
      ),
      headerRight: (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item title="add trip" iconName="ios-add-circle-outline" onPress={params.handleAddTripBtn} />
        </HeaderButtons>
      )
    }
  };

  componentWillMount() {
    getTripList('user-uuid-fake-sheldon')
    .then(res => this.setState({ trips: res }));
  }

  componentDidMount() {
    this.props.navigation.setParams({
        handleAddTripBtn: () => this.setState({ isVisible: true })
    });
  }

  state = {
    isVisible: false,
    refreshing: false,
    trips: null
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

  handleNewTripCreate = () => {
    this.setState({ isVisible: false});
    // create new trip via api
    createNewTrip(this.state.newTripName);
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    getTripList('user-uuid-fake-sheldon')
    .then((res) => {
      this.setState({ 
        refreshing: false,
        trips: res
      });
    });
  }

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
            {
              tripName: tripInfo.tripName,
              tripId: tripInfo.tripId
            }
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
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        {tripItems}
        <Overlay 
          isVisible={this.state.isVisible}
          width="auto"
          height="auto"
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <Input
            label="Type in a cool name for your new trip!"
            placeholder='TRIP NAME'
            onChangeText={(text) => this.setState({newTripName: text})}
            value={this.state.text}
            onSubmitEditing={this.handleNewTripCreate}
          />
        </Overlay>
      </ScrollView>
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

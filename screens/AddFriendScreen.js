import React, { Component } from "react";
import { ScrollView, View, TouchableOpacity, FlatList } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import FA_Icon from '../components/FontAwesomeIcons';
import { searchUser } from '../components/api/api';


export default class AddFriendScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Friend'
    }
  };

  state = {
    searchValue: '',
    searchRes: null,
  };

  handleInputChange = (searchValue) => {
    this.setState({searchValue: searchValue});
  }

  handleSearchEnter = () => {
    const { searchValue } = this.state;
    
    searchUser(searchValue)
    .then((res) => this.setState({ searchRes: [res] }));
  }

  render() {
    const { searchValue, searchRes } = this.state;

    return (
      <View>
        <SearchBar 
          placeholder="Email Address" 
          lightTheme 
          round 
          onChangeText={this.handleInputChange}
          value={searchValue}
          onSubmitEditing={this.handleSearchEnter}
        />
        <FlatList
          data={this.state.searchRes}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.firstName} ${item.lastName}`}
              subtitle={`${item.email}`}
              leftAvatar={{ title: `${item.firstName}` }}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          )}
          keyExtractor={item => item.email}
        />
      </View>
    );
  }
};
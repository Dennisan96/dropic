import React, { Component } from "react";
import { ScrollView, View, TouchableOpacity, FlatList } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import FA_Icon from '../components/FontAwesomeIcons';


export default class AddFriendScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Friend'
    }
  };

  state = {
    searchValue: ''
  };

  handleInputChange = (searchValue) => {
    this.setState({searchValue: searchValue});
  }

  handleSearchEnter = (e) => {
    console.log(e.nativeEvent.text);
  }

  render() {
    const { searchValue } = this.state;

    return (
      <SearchBar 
        placeholder="Email Address" 
        lightTheme 
        round 
        onChangeText={this.handleInputChange}
        value={searchValue}
        onSubmitEditing={this.handleSearchEnter}
      />
    );
  }
};
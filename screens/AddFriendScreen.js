import React, { Component } from "react";
import { ScrollView, View, TouchableOpacity, FlatList, RefreshControl, } from "react-native";
import { ListItem, SearchBar, Button, Divider } from "react-native-elements";
import FA_Icon from '../components/FontAwesomeIcons';
import { searchUser, sendFriendReq, getSentFriendReq } from '../components/api/api';


export default class AddFriendScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Friend'
    }
  };

  state = {
    searchValue: '',
    searchRes: [{firstName: 'first', lastName: 'last', email: 'email@email.com', id: 'user-uuid'}],
    pulling: 'false',
    sentReq: '',
    recvReq: '',
  };

  handleInputChange = (searchValue) => {
    this.setState({searchValue: searchValue});
  }

  handleSearchEnter = () => {
    const { searchValue } = this.state;
    
    searchUser(searchValue)
    .then((res) => this.setState({ searchRes: [res] }));
  }

  handleBtnPress = (toUserId) => {
    sendFriendReq('user-uuid-fake-sheldon', toUserId)
    .then(res => console.log(res));
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    // this.setState({
    //   sentReq: [{firstName: 'first', lastName: 'last', email: 'email@email.com', id: 'user-uuid'}],
    //   recvReq: [{firstName: 'first', lastName: 'last', email: 'email@email.com', id: 'user-uuid'}],
    //   refreshing: false
    // });
    
    this.setState({refreshing: true});
    getSentFriendReq('user-uuid-fake-sheldon')
    .then((res) => {
      console.log(res);
      this.setState({ 
        refreshing: false
      });
    });
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  render() {
    const { searchValue, searchRes } = this.state;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
      }
      
      >
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
              rightElement = {
                <Button
                  title="Add Friend"
                  type="outline"
                  titleStyle={{ fontSize: 12 }}
                  onPress={() => this.handleBtnPress(item.id)}
                />
              }
            />
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <Divider style={{ backgroundColor: '#2f95dc' }} />
        <FlatList
          data={this.state.recvReq}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.firstName} ${item.lastName}`}
              subtitle={`${item.email}`}
              leftAvatar={{ title: `${item.firstName}` }}
              containerStyle={{ borderBottomWidth: 0 }}
              rightElement = {
                <Button
                  title="Accept Request"
                  type="outline"
                  titleStyle={{ fontSize: 12 }}
                />
              }
            />
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <Divider style={{ backgroundColor: '#2f95dc' }} />
        <FlatList
          data={this.state.sentReq}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.firstName} ${item.lastName}`}
              subtitle={`${item.email}`}
              leftAvatar={{ title: `${item.firstName}` }}
              containerStyle={{ borderBottomWidth: 0 }}
              rightElement = {
                <Button
                  title="Request Sent"
                  type="outline"
                  titleStyle={{ fontSize: 12 }}
                  disabled
                />
              }
            />
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </ScrollView>
    );
  }
};
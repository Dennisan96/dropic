import React, { Component } from "react";
import { ScrollView, View, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { ListItem, SearchBar, CheckBox } from "react-native-elements";
import { Icon } from 'expo';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import { getFriendList, getFriendsInfo, inviteFriends } from '../components/api/api';


const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={Icon.Ionicons} iconSize={23} color="#2f95dc" />
);

export default class InviteFriendsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
      title: 'Invite Friends',
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
      loading: false,
      friendList: [],
      error: null,
      refreshing: false,
      checklist: null,
      inviteList: []
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
        handleDoneBtn: () => {
          let addList = this._getAddList();
          // console.log(navigation.getParam('tripId'));
          inviteFriends(navigation.getParam('tripId'), addList)
          .then(() => console.log('ok'));
          
          navigation.goBack();
        }
    });
  }

  _getAddList = () => {
    const { checklist, friendList } = this.state;
    let list = [];
    for (let i = 0; i < checklist.length; i++) {
      if (checklist[i]) {
        list.push(friendList[i].id);
      }
    }
    return list;
  }

  componentWillMount() {
    getFriendList('user-uuid-fake-sheldon')
    .then((res) => {
        getFriendsInfo(res)
        .then((res) => this.setState({ 
          friendList: res,
          checklist: Array(res.length).fill(false)
        }));
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

  handleCheckBoxPress = (index) => {
    let newChecklist = this.state.checklist;
    newChecklist[index] = !newChecklist[index];
    // console.log(newChecklist);
    this.setState({ checklist: newChecklist });
  }

  render() {
    const { checklist, friendList } = this.state;

    if(!friendList || !checklist){
      return null;
   }

    return (
      <ScrollView containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={friendList}
          extraData={this.state}
          renderItem={({ item, index }) => (
            <ListItem
              roundAvatar
              title={`${item.firstName} ${item.lastName}`}
              subtitle={`${item.email}`}
              leftAvatar={{ title: `${item.firstName}` }}
              containerStyle={{ borderBottomWidth: 0 }}
              checkBox={{
                size: 20,
                checked: checklist[index],
                onPress: () => this.handleCheckBoxPress(index)
              }}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </ScrollView>
    );
  }
};
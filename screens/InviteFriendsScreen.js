import React, { Component } from "react";
import { ScrollView, View, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { ListItem, SearchBar, CheckBox } from "react-native-elements";
import { Icon } from 'expo';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';


const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={Icon.Ionicons} iconSize={23} color="#2f95dc" />
);

export default class InviteFriendsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Invite Friends',
      headerRight: (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item title="Done" onPress={() => navigation.goBack()} />
        </HeaderButtons>
      )
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      checklist: null,
      inviteList: []
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false,
          checklist: page === 1 ? Array(res.results.length).fill(false) : [...this.state.checklist, ...Array(res.results.length).fill(false)]
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

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

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  handleCheckBoxPress = (index) => {
    let newChecklist = this.state.checklist;
    newChecklist[index] = !newChecklist[index];
    this.setState({ checklist: newChecklist });
  }

  render() {
    const { checklist } = this.state;

    return (
      <ScrollView containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          extraData={this.state}
          renderItem={({ item, index }) => (
            <ListItem
              roundAvatar
              title={`${item.name.first} ${item.name.last}`}
              subtitle={`${item.email}`}
              leftAvatar={{ source: { uri: item.picture.thumbnail } }}
              containerStyle={{ borderBottomWidth: 0 }}
              checkBox={{
                size: 20,
                checked: checklist[index],
                onPress: () => this.handleCheckBoxPress(index)
              }}
            />
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          // onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </ScrollView>
    );
  }
};
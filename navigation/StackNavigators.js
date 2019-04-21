import React from 'react';
import { Platform } from 'react-native';
import { 
  createStackNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SharesScreen from '../screens/SharesScreen';
import ContactsScreen from '../screens/ContactsScreen';
import AddScreen from '../screens/AddScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';


export const SharesStack = createStackNavigator({
  Shares: SharesScreen
});
SharesStack.navigationOptions = {
  tabBarLabel: 'Shares',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list-box' : 'md-list-box'}
    />
  )
};

export const ContactsStack = createStackNavigator({
  Contacts: ContactsScreen,
});
ContactsStack.navigationOptions = {
  tabBarLabel: 'Contacts',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contacts' : 'md-contacts'}
    />
  ),
};

export const AddStack = createStackNavigator({
  Add: AddScreen,
});
AddStack.navigationOptions = {
  tabBarLabel: 'New Trip',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'}
    />
  ),
};

export const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});
SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
    />
  ),
};

export const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});
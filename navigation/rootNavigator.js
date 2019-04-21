import React from 'react';
import { 
  createBottomTabNavigator,
  createDrawerNavigator
} from 'react-navigation';
import {
  SharesStack,
  ContactsStack,
  AddStack,
  PhotoStack,
  SettingsStack,
  ProfileStack
} from './StackNavigators'


const TabNavigator = createBottomTabNavigator({
  SharesStack,
  ContactsStack,
  AddStack,
  PhotoStack,
  SettingsStack
});
  
export const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      drawerLabel: 'Home'
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      drawerLabel: 'Profile'
    }
  },
  About: {
    screen: SharesStack,
    navigationOptions: {
      drawerLabel: 'About'
    }
  },
});
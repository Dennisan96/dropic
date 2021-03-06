import React from 'react';
import { 
  createBottomTabNavigator,
  createDrawerNavigator
} from 'react-navigation';
import {
  SharesStack,
  ContactsStack,
  PhotoStack,
  SettingsStack,
  ProfileStack
} from './StackNavigators'


const TabNavigator = createBottomTabNavigator({
  SharesStack,
  ContactsStack,
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
  }
});
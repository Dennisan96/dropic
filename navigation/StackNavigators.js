import React from 'react';
import { Platform } from 'react-native';
import { 
  createStackNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SharesScreen from '../screens/SharesScreen';
import ContactsScreen from '../screens/ContactsScreen';
import AddFriendScreen from '../screens/AddFriendScreen';
import AddScreen from '../screens/AddScreen';
import PhotoScreen from '../screens/PhotoScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TripScreen from '../screens/TripScreen';
import AddTripScreen from '../screens/AddTripScreen';
import PhotoPickerScreen from '../screens/PhotoPickerScreen';
import InviteFriendsScreen from '../screens/InviteFriendsScreen';
import GalleryScreen from '../screens/GalleryScreen';

// Auth stack screen imports

import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import CreateProfileScreen from '../screens/CreateProfileScreen';


export const SharesStack = createStackNavigator({
  Shares: SharesScreen,
  AddTrip: AddTripScreen,
  Trip: TripScreen,
  Gallery: GalleryScreen,
  PhotoPicker: PhotoPickerScreen,
  InviteFriends: InviteFriendsScreen,
  Profile: ProfileScreen
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
  AddFriend: AddFriendScreen
});
ContactsStack.navigationOptions = {
  tabBarLabel: 'Friendds',
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

export const PhotoStack = createStackNavigator({
  Photo: PhotoScreen,
});
PhotoStack.navigationOptions = {
  tabBarLabel: 'Photos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-photos' : 'md-photos'}
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

// export const ProfileStack = createStackNavigator({
//   Profile: ProfileScreen
// });

// Auth stack
export const AuthStack = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: () => ({
      title: `Welcome to this App`, // for the header screen
      headerBackTitle: 'Back'
    }),
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: () => ({
      title: `Create a new account`,
    }),
  },
  CreateProfile: {
    screen: CreateProfileScreen,
    navigationOptions: () => ({
      title: `Create your user profile`,
    }),
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: () => ({
      title: `Log in to your account`,
    }),
  }
})
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { DrawerNavigator } from './rootNavigator';
import { AuthStack } from './StackNavigators';
import AuthLoadingScreen from './AuthLoadingScreen';

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: DrawerNavigator
  }
));
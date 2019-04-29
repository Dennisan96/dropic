import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { DrawerNavigator } from './rootNavigator';
import { AuthStack } from './StackNavigators';

export default createAppContainer(createSwitchNavigator(
  {
    App: DrawerNavigator
  }
));
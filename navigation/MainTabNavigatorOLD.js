import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import TabBarIcon from '../components/TabBarIcon';
import MainScreen from '../screens/OverviewScreen';
import ActivityScreen from '../screens/ActivityScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CategoriesScreen from '../screens/CategoriesScreenOLD';
import SignInScreen from '../screens/SignInScreen';
import Variables from '../constants/Variables';

const LogInStack = createStackNavigator({
  LogIn: LogInScreen,
  SignUp: SignUpScreen,
});

SignInStack.navigationOptions = {
  tabBarLabel: 'Log in',
  tabBarVisible: false,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: CategoriesScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarVisible: true,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? `ios-settings${focused ? '' : '-outline'}` : 'md-settings'}
    />
  ),
};

const CategoriesStack = createStackNavigator({
  SignUp: CategoriesScreen,
});

CategoriesStack.navigationOptions = {
  tabBarLabel: 'Categories',
  tabBarVisible: true,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? `ios-list-box${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

const ActivityStack = createStackNavigator({
  Activity: ActivityScreen, 
});

ActivityStack.navigationOptions = {
  tabBarLabel: 'Activity',
  tabBarVisible: true,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-pulse${focused ? '' : '-outline'}`
          : 'md-pulse'
      }
    />
  ),
};

const MainStack = createStackNavigator({
  Main: MainScreen,
  Settings: CategoriesScreen,
 
  
});

MainStack.navigationOptions = {
  tabBarLabel: 'Overview',
  tabBarVisible: true,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-eye${focused ? '' : '-outline'}`
          : 'md-eye'
      }
    />
  ),
};


export default createBottomTabNavigator({
  // LogInStack,
  // ActivityStack,
  // MainStack,
  // CategoriesStack,
  // SettingsStack,
}, {
  tabBarOptions: {
    style: {
      backgroundColor: Variables.secondaryColor,
    },
    activeTintColor: Variables.primaryColor,
  }

}

);

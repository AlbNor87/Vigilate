import React from 'react';
import { Platform } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import OverviewScreen from '../screens/OverviewScreen';
import ActivityScreen from '../screens/ActivityScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import TabBarIcon from '../components/TabBarIcon';
import Variables from '../constants/Variables';

const OverviewStack = createStackNavigator({ 
  Overview: OverviewScreen,
});

OverviewStack.navigationOptions = {
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

const CategoriesStack = createStackNavigator({
  Categories: CategoriesScreen,
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

const MainTabNavigator = createBottomTabNavigator({
    Overview: OverviewStack,
    Activity: ActivityStack,
    Categories: CategoriesStack, 
    // Settings: SettingsStack, 
  }, {
    tabBarOptions: {
      style: {
        backgroundColor: Variables.secondaryColor,
      },
      activeTintColor: Variables.primaryColor,
    }

  }

);

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen
});

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: MainTabNavigator,
    Auth: AuthStack,
  },
  {
    // initialRouteName: 'App',
    initialRouteName: 'AuthLoading',
    animationEnabled: true,
  }
);
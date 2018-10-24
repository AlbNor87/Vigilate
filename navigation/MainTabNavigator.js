import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, StackNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import StartScreen from '../screens/StartScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ItemsScreen from '../screens/ItemsScreen';
import LogInScreen from '../screens/LogInScreen';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarVisible: true,
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

const SignUpStack = createStackNavigator({
  SignUp: SignUpScreen,
});

// SignUpStack.navigationOptions = {
//   tabBarLabel: 'SignUp',
//   tabBarVisible: true,
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-information-circle${focused ? '' : '-outline'}`
//           : 'md-information-circle'
//       }
//     />
//   ),
// };

const StartStack = createStackNavigator({
  Start: StartScreen,
});

StartStack.navigationOptions = {
  tabBarLabel: 'Start',
  tabBarVisible: true,
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

const MainStack = createStackNavigator({
  LogIn: LogInScreen,
  Items: ItemsScreen,
  SignUp: SignUpScreen
});

MainStack.navigationOptions = {
  tabBarLabel: 'Main',
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

export default createBottomTabNavigator({
  // LogInStack,
  // StartStack,
  MainStack,
  // SignUpStack,
  // ItemsStack,
});
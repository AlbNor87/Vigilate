import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { createStackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { FirebaseApiKey } from './env.js'

const firebaseConfig = {
  apiKey: FirebaseApiKey,
  authDomain: "vigilate-6a3d8.firebaseapp.com",
  databaseURL: "https://vigilate-6a3d8.firebaseio.com",
  projectId: "vigilate-6a3d8",
  storageBucket: "vigilate-6a3d8.appspot.com",
  messagingSenderId: "1092208227345"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig);


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    isSignedIn: false
  };

  componentDidMount() {
    this.isSignedIn();
  }

  isSignedIn(){
    firebase.auth().onAuthStateChanged(firebaseUser => {

      if(firebaseUser) {
        this.setState({ isSignedIn: true})
        console.log('You are signed in!');
      } else {
        console.log('Not logged in');
      }

    })
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

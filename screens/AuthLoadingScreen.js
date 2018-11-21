import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import { LinearGradient } from 'expo';
import * as firebase from 'firebase';
import Variables from '../constants/Variables';
import { styles } from '../assets/styles/Styles';
import Image from 'react-native-remote-svg'

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      this._bootstrapAsync();
    }, 3000);
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // const userToken = await AsyncStorage.getItem('userToken');

    await firebase.auth().onAuthStateChanged(firebaseUser => {

        if(firebaseUser) {
          console.log('You are signed in');
          console.log('Navigating to MainScreen');
          this.props.navigation.navigate('App');
        } else {
          console.log('You are not signed in');
          console.log('Navigating to SignInScreen');
          this.props.navigation.navigate('Auth');
        }
  
      })

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator />
  //       <StatusBar barStyle="default" />
  //       <Text>Loading... Hold on!</Text>
  //       <Image source={require('../assets/images/spinner.svg')}/>
  //     </View>
  //   );
  // }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <LinearGradient 
              colors={[ Variables.primaryColor , 'black']} 
              style={screenStyles.gradientContainer}
              start={[0,0]}
              end={[0,0.8]}
              >

                  <View style={screenStyles.container}>
                    <Image 
                    source={require('../assets/images/simple.svg')}
                    style={{width: 230,}}
                    // style={screenStyles.spinner}
                    />
                    <Text style={screenStyles.text}>Loading</Text>
                  </View>

              
            </LinearGradient>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const screenStyles = StyleSheet.create({
  gradientContainer: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    width: 300,
  },
  text: {
    marginTop: -50,
    fontSize: 24,
    color: Variables.tertiaryColor,
    textAlign: "center"
  },
  container: {
    marginBottom: 120,
    // textAlign: "center"

  }

});

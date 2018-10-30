import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  View,
  StatusBar,
  Button,
  Alert
} from 'react-native';
import * as firebase from 'firebase';
import Variables from '../constants/Variables';
import { styles } from '../assets/styles/Styles';
import { LinearGradient } from 'expo';
import VigButton from '../components/VigButton';

const firebaseConfig = {
    apiKey: "AIzaSyBiPRK6dSTVxy2gvRnd4vV6kNHlsOCJmIY",
    authDomain: "vigilate-e05ea.firebaseapp.com",
    databaseURL: "https://vigilate-e05ea.firebaseio.com",
    projectId: "vigilate-e05ea",
    storageBucket: "vigilate-e05ea.appspot.com"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class OverviewScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'Overview'),
      headerTintColor: Variables.primaryColor,
      headerStyle: { 
        backgroundColor: Variables.secondaryColor,
        borderBottomWidth: 0,
       },
      headerTitleStyle: { color: Variables.titleColor },
    };
  };

  componentDidMount() {
    this.props.navigation.addListener('willFocus', payload => {this._onEnter();
    });
  }

  _onEnter() {
    console.log('You entered MainScreen');
  }

  _logOut() {

    firebase.auth().signOut();
    console.log('You are now signed out!')
    this.props.navigation.navigate('Auth');
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content"/>
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <LinearGradient 
            colors={[ Variables.primaryColor , 'black']} 
            style={styles.gradientContainer}
            start={[0,0]}
            end={[0,0.8]}
            >

            <View style={screenStyles.headerContainer}>
              <Text style={screenStyles.title}>Welcome!</Text>
              <Text style={screenStyles.text}>You are now successfully signed up and logged in. As you can see a tab navigator has appeared at the bottom of the screen. Explore and get started!  </Text>
              
                <View style={styles.buttonContainer}>

                  <VigButton
                    type='solid'
                    onPress={() => this.props.navigation.navigate('Categories')}
                    value='Get started'/>

                    <VigButton
                    type='hollow'
                    onPress={this._logOut.bind(this)}
                    value='Sign out'/>

                </View>

            </View>
        
            </LinearGradient>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

//Screen specific styles...
const screenStyles = StyleSheet.create({
  gradientContainer: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerContainer: {
    display: 'flex',
    paddingHorizontal: 40,
    width: '100%',
    flex: 1,
    // backgroundColor: 'green',
    justifyContent: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    fontSize: 39,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  text: {
    paddingLeft: 10,
    textAlign: 'center',
    // color: 'white',
    color: Variables.textColor,
    marginBottom: 30,
  }
});

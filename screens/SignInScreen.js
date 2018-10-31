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
import { FirebaseApiKey } from '../env.js'

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    // header: null,
    title: 'Sign in',
    headerStyle: { 
      backgroundColor: Variables.secondaryColor,
      borderBottomWidth: 0,
    },
    headerTitleStyle: { color: Variables.titleColor },
  };

  state = {
    isActiveInputUsername: false,
    isActiveInputPassword: false,
    email: '',
    password: '',
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', payload => {this._onEnter();
    });


  }

  _onEnter() {
    console.log('You entered SignInScreen');
    console.log('key: ', FirebaseApiKey)

    this.setState({
      email: '',
      password: '',
    })

    const inputEmail = this.refs.txtEmail;
    inputEmail.clear();

    this.setState({ 
      isActiveInputPassword: false
    })

    // this._clearInputs();

    firebase.auth().onAuthStateChanged(firebaseUser => {

      if(firebaseUser) {
        console.log(firebaseUser);
        console.log('You are logged in!');
        this.props.navigation.navigate('AuthLoading'); 
      } else {
        console.log('Not logged in');
      }

    })


  }

  _clearInputs() {
    const inputEmail = this.refs.txtEmail;
    const inputPassword = this.refs.txtPassword;
    inputEmail.clear();
    inputPassword.clear();
  } 

  _logOut() {

    firebase.auth().signOut();
    console.log('You are now signed out!')

    firebase.auth().onAuthStateChanged(firebaseUser => {

      if(firebaseUser) {
        console.log(firebaseUser);
      } else {
        console.log('Not logged in');
      }

    })

  }

  async _signIn() {

    const {email, password} = this.state;
    const inputEmail = this.refs.txtEmail;
    const inputPassword = this.refs.txtPassword;

    if (!email || email == '') {
      Alert.alert(
        'Crendentials missing!',
        'Fill in your email, please.',
        [
          {text: 'Ok', onPress: () => inputEmail.focus()},
        ],
        { cancelable: false }
      )
      return;
    }

    if (!password || password == '') {
      Alert.alert(
        'Crendentials missing!',
        'Fill in your password, please.',
        [
          {text: 'Ok', onPress: () => inputPassword.focus()},
        ],
        { cancelable: false }
      )
      return;
    }

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          Alert.alert(
            'Wrong password!',
            'Try again.',
            [
              {text: 'Ok', onPress: () => inputPassword.focus()},
            ],
            { cancelable: false }
          )
          
        } else if (errorCode === 'auth/invalid-email') {
          Alert.alert(
            'Check your spelling!',
            errorMessage,
            [
              {text: 'Ok', onPress: () => inputEmail.focus()},
            ],
            { cancelable: false }
          )
        } else {
          alert(errorMessage);
        }

        console.log(error);
      });
    } catch(e) {
      alert(e)
    }

    firebase.auth().onAuthStateChanged(firebaseUser => {

      if(firebaseUser) {
        console.log(firebaseUser);
        console.log('You are now successfully logged in!');
        this.props.navigation.navigate('AuthLoading');
      } else {
        console.log('Not logged in');
      }

    })

  }

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

              <View style={screenStyles.logoContainer}>
                  <Image source={require('../assets/images/logo.png')}/>
              </View>

              <View style={styles.inputContainer}>

                <TextInput 
                style={(this.state.isActiveInputUsername) ? styles.textInputActive : styles.textInput}
                onChangeText={(value) => this.setState({email: value.trim()})}
                onFocus={() => this.setState({ isActiveInputUsername: true})}
                onBlur={() => this.setState({ isActiveInputUsername: false})} 
                placeholder="Email"
                placeholderTextColor={Variables.placeHolderTextColor}
                keyboardType="email-address"
                returnKeyType="next"
                autoCorrect={false}
                onSubmitEditing={() => this.refs.txtPassword.focus() }
                ref={"txtEmail"}
                // value={this.state.email}
                />

                <TextInput 
                style={(this.state.isActiveInputPassword) ? styles.textInputActive : styles.textInput}
                onChangeText={(value) => this.setState({password: value.trim()})}
                onFocus={() => this.setState({ isActiveInputPassword: true})}
                onBlur={() => this.setState({ isActiveInputPassword: false})}
                placeholder="Password"
                placeholderTextColor={Variables.placeHolderTextColor}
                secureTextEntry={true}
                returnKeyType="go"
                autoCorrect={false}
                onSubmitEditing={this._signIn.bind(this)}
                ref={"txtPassword"}
                // value={this.state.password}
                />

                <View style={styles.buttonContainer}>

                  <VigButton
                    type='solid'
                    onPress={this._signIn.bind(this)}
                    value='Sign in'/>

                  <VigButton
                    type='hollow'
                    onPress={() => this.props.navigation.navigate('SignUp')  }
                    value='Sign up'/>
                  
                  {/* <VigButton
                    type='solid'
                    onPress={() => this.props.navigation.navigate('Main')  }
                    value='Main'/> */}


                </View>
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
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  logoContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    zIndex: 2,
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    fontSize: 46,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    color: 'white'
  }
});

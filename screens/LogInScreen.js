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
  Alert
} from 'react-native';
import * as firebase from 'firebase';
import Variables from '../constants/Variables';
import { styles } from '../assets/styles/Styles';
import { LinearGradient } from 'expo';
import VigButton from '../components/VigButton';

export default class LogInScreen extends React.Component {
  static navigationOptions = {
    title: 'Log in',
    headerStyle: { 
      backgroundColor: Variables.darkColor,
      borderBottomWidth: 1,
      borderBottomColor: Variables.primaryColor,
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
    console.log('You entered LogInScreen');

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

    this._logOut();

    firebase.auth().onAuthStateChanged(firebaseUser => {

      if(firebaseUser) {
        console.log(firebaseUser);
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

  async _logIn() {

      const {email, password} = this.state;
      const inputEmail = this.refs.txtEmail;
      const inputPassword = this.refs.txtPassword;

      if (!email || email == '') {
        Alert.alert(
          'Crendentials missing!',
          'Fill in your fucking email, please.',
          [
            {text: 'Ok', onPress: () => this.refs.txtEmail.focus()},
          ],
          { cancelable: false }
        )
        return;
      }

      if (!password || password == '') {
        Alert.alert(
          'Wake up!',
          "Did you seriously think you could log in without a password?",
          [
            {text: 'Ok', onPress: () => this.refs.txtEmail.focus()},
          ],
          { cancelable: false }
        )
        return;
      }

      // if (!email || email == '') {
      //   alert('Fill in your fucking email!');
      //       inputEmail.focus();
      //   return;
      // }
      // if (!password || password == '') {
      //   alert('Wrong password.');
      //       inputPassword.focus();
      //   return;
      // }

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

      console.log('User:', firebase.auth().onAuthStateChanged(firebaseUser => {}));

      firebase.auth().onAuthStateChanged(firebaseUser => {

        if(firebaseUser) {
          console.log(firebaseUser);
          console.log('You are now successfully logged in!');
          this.props.navigation.navigate('Items'); 
        } else {
          console.log('Not logged in');
        }
  
      })
  
    }

    

  render() {
    return (
      
      <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content"/>
        <KeyboardAvoidingView behavior='padding' style={styles.keyboardAvoindingContainer}>
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <LinearGradient 
            colors={[ Variables.primaryColor , 'black']} 
            style={styles.gradientContainer}
            start={[0,0]}
            end={[0,0.8]}
            >

              <View style={screenStyles.logoContainer}>
                <Image source={require('../assets/images/logo.png')}/>
              </View>

              {/* <View style={screenStyles.stateCheck}>
                <Text style={screenStyles.stateCheckText}>Email: {this.state.email}</Text>
                <Text style={screenStyles.stateCheckText}>Password: {this.state.password}</Text>
              </View> */}
            
              <View style={styles.inputContainer}>

                <TextInput 
                style={(this.state.isActiveInputUsername) ? styles.textInputActive : styles.textInput}
                onChangeText={(value) => this.setState({email: value.trim()})}
                onFocus={() => this.setState({ isActiveInputUsername: true})}
                onBlur={() => this.setState({ isActiveInputUsername: false})} 
                placeholder="Username/Email"
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
                onSubmitEditing={this._logIn.bind(this)}
                ref={"txtPassword"}
                // value={this.state.password}
                />

                <View style={styles.buttonContainer}>

                  <VigButton
                    type='solid'
                    onPress={this._logIn.bind(this)}
                    value='Log in'/>

                  <VigButton
                    type='hollow'
                    onPress={() => this.props.navigation.navigate('SignUp')  }
                    value='Sign up'/>

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
  logoContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stateCheck: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stateCheckText: {
    fontSize: 9,
    color: "white"
  }
});
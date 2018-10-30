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

export default class SignUpScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'Sign up'),
      headerTintColor: Variables.primaryColor,
      headerStyle: { 
        backgroundColor: Variables.secondaryColor,
        borderBottomWidth: 0,
       },
      headerTitleStyle: { color: Variables.titleColor },
    };
  };

  state = {
    isActiveInputUsername: false,
    isActiveInputEmail: false,
    isActiveInputPassword: false,
    isActiveInputRepeatPassword: false,
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', payload => {this._onEnter();
    });
  }

  _onEnter() {
    console.log('You entered SignUpScreen');
  }

  // async _register() {
  //   console.log('Register triggered!');
  //   const inputUsername = this.refs.txtUsername;
  //   const inputEmail = this.refs.txtEmail;
  //   const inputPassword = this.refs.txtPassword;
  //   const inputRepeatPassword = this.refs.txtRepeatPassword;
  //   const {email, username, password, repeatPassword} = this.state;

  //   if(password && password === repeatPassword){

  //     try {
  //       await
  //         firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
  //           // [END createwithemail]
  //           // callSomeFunction(); Optional
  //           // var user = firebase.auth().currentUser;
  //           user.updateProfile({
  //             displayName: username
  //           }).then(function() {
  //             console.log('Username update successful!')
  //           }, function(error) {
  //             console.log(error)
  //             console.error(error);
  //           });        
  //       }, function(error) {
  //           // Handle Errors here.
  //           var errorCode = error.code;
  //           var errorMessage = error.message;
  //           // [START_EXCLUDE]
  //           if (errorCode == 'auth/weak-password') {
  //               alert('The password is too weak.');
  //           } else {
  //               console.error(error);
  //           }
  //           // [END_EXCLUDE]
  //       });
  //     } catch(e) {
  //       alert(e)
  //     }

  //   } else {

  //     Alert.alert(
  //       'Confirm Password!',
  //       "The passwords you put in does not match, please make them match.",
  //       [
  //         {text: 'Ok', onPress: () => this.refs.txtPassword.focus()},
  //       ],
  //       { cancelable: false }
  //     )

  //   }

  // }

  async _register() {
    console.log('Register triggered!');
    const inputUsername = this.refs.txtUsername;
    const inputEmail = this.refs.txtEmail;
    const inputPassword = this.refs.txtPassword;
    const inputRepeatPassword = this.refs.txtRepeatPassword;
    const {email, username, password, repeatPassword} = this.state;

    if (!username || username == '') {
      Alert.alert(
        'Crendentials missing!',
        'Fill in your username, please.',
        [
          {text: 'Ok', onPress: () => inputUsername.focus()},
        ],
        { cancelable: false }
      )
      return;
    }

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

    if(password && password === repeatPassword){

      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        this.props.navigation.navigate('Main'); 
      } catch(e) {
        alert(e)
      }

    } else {

      Alert.alert(
        'Confirm Password!',
        "The passwords you put in does not match, please make them match.",
        [
          {text: 'Ok', onPress: () => this.refs.txtPassword.focus()},
        ],
        { cancelable: false }
      )

    }

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

            <View style={screenStyles.headerContainer}>
              <Text style={screenStyles.title}>Create account</Text>
              <Text style={screenStyles.text}>Submit your credentials to create an account and get started right now, it's super easy and totally free!</Text>
            </View>

                <View style={styles.inputContainer}>    

                  <TextInput 
                  style={(this.state.isActiveInputUsername) ? styles.textInputActive : styles.textInput}
                  onChangeText={(value) => this.setState({username: value.trim()})}
                  onFocus={() => this.setState({ isActiveInputUsername: true})}
                  onBlur={() => this.setState({ isActiveInputUsername: false})} 
                  placeholder="Username"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={(value) => this.setState({username: value.trim()})}
                  onSubmitEditing={() => this.refs.txtEmail.focus() }
                  ref={"txtUsername"}
                  />

                  <TextInput 
                  style={(this.state.isActiveInputEmail) ? styles.textInputActive : styles.textInput}
                  onChangeText={(value) => this.setState({email: value.trim()})}
                  onFocus={() => this.setState({ isActiveInputEmail: true})}
                  onBlur={() => this.setState({ isActiveInputEmail: false})} 
                  placeholder="Email"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  keyboardType="email-address"
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={(value) => this.setState({email: value.trim()})}
                  onSubmitEditing={() => this.refs.txtPassword.focus() }
                  ref={"txtEmail"}
                  />

                  <TextInput 
                  style={(this.state.isActiveInputPassword) ? styles.textInputActive : styles.textInput}
                  onChangeText={(value) => this.setState({password: value.trim()})}
                  onFocus={() => this.setState({ isActiveInputPassword: true})}
                  onBlur={() => this.setState({ isActiveInputPassword: false})} 
                  placeholder="Password"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  secureTextEntry={true}
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={(value) => this.setState({password: value.trim()})}
                  onSubmitEditing={() => this.refs.txtRepeatPassword.focus() }
                  ref={"txtPassword"}
                  />

                  <TextInput 
                  style={(this.state.isActiveInputRepeatPassword) ? styles.textInputActive : styles.textInput}
                  onChangeText={(value) => this.setState({repeatPassword: value.trim()})}
                  onFocus={() => this.setState({ isActiveInputRepeatPassword: true})}
                  onBlur={() => this.setState({ isActiveInputRepeatPassword: false})} 
                  placeholder="Repeat password"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  secureTextEntry={true}
                  returnKeyType="go"
                  autoCorrect={false}
                  onChangeText={(value) => this.setState({repeatPassword: value.trim()})}
                  ref={"txtRepeatPassword"}
                  onSubmitEditing={this._register.bind(this)}
                  />

                  <View style={styles.buttonContainer}>

                  <VigButton
                    type='solid'
                    onPress={this._register.bind(this)}
                    value='Submit'/>

                    <VigButton
                    type='hollow'
                    onPress={() => this.props.navigation.goBack()}
                    value='Go back'/>

                  </View>
                
                </View>
              {/* </View> */}
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
  headerContainer: {
    display: 'flex',
    paddingHorizontal: 40,
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
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
    textAlign: 'left',
    color: Variables.textColor,
  }
});

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
  Button
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
        backgroundColor: Variables.backgroundColorDark,
        borderBottomColor: Variables.primaryColor,
       },
      headerTitleStyle: { color: Variables.titleColor },
    };
  };

  state = {
    email: 'albert@pnxduo.com',
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

  async _register() {
    console.log('Register triggered!');
    // console.log('email: ', this.state.email);
    // console.log('password: ', this.state.password);
    const {email, username, password, repeatPassword} = this.state;
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      this.props.navigation.navigate('Items'); 
    } catch(e) {
      alert(e)
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

            {/* <View style={screenStyles.signUpContainer}> */}

            {/* <View style={styles.container}> */}

                {/* <View styles={screenStyles.headerContainer}>
                
                <Text style={screenStyles.title}>Create account</Text>
                <Text style={screenStyles.text}>Submit your credentials to create an acocunt, it totally free!</Text>

                </View> */}

                <View style={styles.inputContainer}>    

                  <TextInput 
                  style={styles.textInput}
                  placeholder="Username"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={(value) => this.setState({username: value.trim()})}
                  onSubmitEditing={() => this.refs.txtEmail.focus() }
                  ref={"txtUsername"}
                  />

                  <TextInput 
                  style={styles.textInput}
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
                  style={styles.textInput}
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
                  style={styles.textInput}
                  placeholder="Repeat password"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  secureTextEntry={true}
                  returnKeyType="go"
                  autoCorrect={false}
                  onChangeText={(value) => this.setState({repeatPassword: value.trim()})}
                  ref={"txtRepeatPassword"}
                  
                  />

                  <View style={styles.buttonContainer}>

                  <VigButton
                    type='solid'
                    onPress={this._register.bind(this)}
                    value='Create account'/>

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
  // signUpContainer: {
  //   position: 'relative',
  //   width: '100%',
  //   // height: '100vh',
  //   display: 'flex',
  //   flex: 1,
  //   flexDirection: 'column',
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  //   paddingBottom: 20,
  // },
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
    // padding: 10
  },
  text: {
    color: 'white'
  }
});

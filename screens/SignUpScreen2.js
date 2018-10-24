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
import { styles, buttons } from '../assets/styles/Styles';
import { LinearGradient } from 'expo';

export default class SignUpScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'Sign up'),
      headerStyle: { 
        backgroundColor: Variables.backgroundColor,
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
    this._log();
  }

  _log(){
    console.log('this.state: ', this.state);
  }

  _goBack() {
    console.log('Hello!')
    // this.props.navigation.navigate('Items'); 
    this.navigation.goBack();
  }

  // async _register() {
  //   console.log('Register triggered!');
  //   // console.log('email: ', this.state.email);
  //   // console.log('password: ', this.state.password);
  //   const {email, username, password, repeatPassword} = this.state;
  //   try {
  //     await firebase.auth().createUserWithEmailAndPassword(email, password);
  //     this.props.navigation.navigate('Items'); 
  //   } catch(e) {
  //     alert(e)
  //   }

  // }

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content"/>
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>

              {/* <View style={styles.stateCheck}>
              <Text style={styles.stateCheckText}>Username: {this.state.username}</Text>
              <Text style={styles.stateCheckText}>Email: {this.state.email}</Text>
              <Text style={styles.stateCheckText}>Password: {this.state.password}</Text>
              <Text style={styles.stateCheckText}>RepeatPassword: {this.state.repeatPassword}</Text>
              </View> */}

                <View style={styles.infoContainer}>    

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

                    <TouchableHighlight
                      onPress={() => this.props.navigation.navigate('Items')  }
                      style={styles.button}
                      underlayColor='#fff'>
                      
                      <Text style={styles.buttonText}>Submit</Text>
                    
                    </TouchableHighlight>

                    <Button
                      onPress={() => this.props.navigation.goBack(null)}
                      title="Go back"
                      style={{ marginTop: 50 }}
                    />

                  </View>
                
                </View>

            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const signUpstyles = StyleSheet.create({
  stateCheck: {
    width: '100%',
    padding: 10
  },
  stateCheckText: {
    width: '100%',
    fontSize: 12,
    textAlign: 'center',
    color: '#ffffff',
    padding: 10
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: "100%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 20,
    color: "white",
    padding: 10,
    paddingHorizontal: 25,
    margin: 10,
    width: "90%",
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 100,
  },
  buttonContainer: {
    width: "100%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 10,
    width: '90%',
    height: 50,
    backgroundColor: 'rgba(0, 102, 255,1.0)',
    padding: 10,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "300",
    textAlign: 'center',
    color: Variables.backgroundColor,
  },
  add: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: 'rgba(0, 102, 255,1.0)',
    padding: 10,
    borderRadius: 10
  },
  title: {
    width: '100%',
    fontSize: 46,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
    padding: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#111111',
    display: 'flex',
    flexDirection: 'column',
  },
});

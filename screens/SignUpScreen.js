import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
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
      // var user = firebase.auth().currentUser;

      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        // const cateoryRef = firebase.database().ref('categories')
        // const usersRef = firebase.database().ref('users');
        // const newUserRef = usersRef.push();
        
        // newUserRef.set({
        //   name: inputUsername,
        //   email: inputEmail,
        //   userid: user.uid
        // })

      } catch(e) {
        alert(e)
      }

      // try {
      //   var user = firebase.auth().currentUser;
      //   user.updateProfile({ displayName: inputUsername });
      // } catch (e) {
      //   alert(e)
      // }

      

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
                  onSubmitEditing={() => this.refs.txtEmail.focus() }
                  ref={"txtUsername"}
                  selectionColor={Variables.tertiaryColor}
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
                  onSubmitEditing={() => this.refs.txtPassword.focus() }
                  ref={"txtEmail"}
                  selectionColor={Variables.tertiaryColor}
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
                  onSubmitEditing={() => this.refs.txtRepeatPassword.focus() }
                  ref={"txtPassword"}
                  selectionColor={Variables.tertiaryColor}
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
                  ref={"txtRepeatPassword"}
                  onSubmitEditing={this._register.bind(this)}
                  selectionColor={Variables.tertiaryColor}
                  />

                  <View style={styles.buttonContainer}>

                  <VigButton
                    type='solid'
                    margin={10}
                    onPress={this._register.bind(this)}
                    value='Submit'/>

                    <VigButton
                    type='hollow'
                    margin={10}
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

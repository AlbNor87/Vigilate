import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  View,
  StatusBar,
} from 'react-native';
import { WebBrowser } from 'expo';

export default class StartScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content"/>
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Text style={styles.title}>VIGILATE</Text>

                <View style={styles.infoContainer}>

                  

                  <TextInput 
                  style={styles.textInput}
                  placeholder="Username/Email"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  keyboardType="email-address"
                  returnKeyType="next"
                  autoCorrect={false}
                  onSubmitEditing={() => this.refs.txtPassword.focus() }
                  />
                  

                  <TextInput 
                  style={styles.textInput}
                  placeholder="Password"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  secureTextEntry={true}
                  returnKeyType="go"
                  autoCorrect={false}
                  ref={"txtPassword"}
                  />

                  <View style={styles.buttonContainer}>
                  <TouchableHighlight
                      onPress={() => this.props.navigation.navigate('SignUp')  }
                      style={styles.button}
                      underlayColor='#fff'>
                        <Text style={styles.buttonText}>Log in</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      onPress={() => this.props.navigation.navigate('SignUp')  }
                      style={styles.button}
                      underlayColor='#fff'>
                        <Text style={styles.buttonText}>Sign up</Text>
                    </TouchableHighlight>

                  </View>
                
                </View>

            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
    color: '#ffffff',
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
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
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

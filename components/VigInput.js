import React from 'react';
import { Text8, StyleSheet, View } from 'react-native';
import Variables from '../constants/Variables';

export default class VigInput extends React.Component {

  state = {
    isActive: false,
  }
  
  render() {
    return (
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
                // value={this.state.?}
                />
    );
  }
}

const buttonStyles = StyleSheet.create({
  container: {
    width: "100%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  solid: {
    margin: 10,
    width: '90%',
    height: 50,
    backgroundColor: Variables.primaryColor,
    padding: 10,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  solidText: {
    fontSize: 24,
    fontWeight: "400",
    textAlign: 'center',
    color: Variables.backgroundColor,
  },
  hollow: {
    margin: 10,
    width: '90%',
    height: 50,
    padding: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Variables.primaryColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center' 
  },
  hollowText: {
    fontSize: 24,
    fontWeight: "300",
    textAlign: 'center',
    color: Variables.primaryColor,
  },
});

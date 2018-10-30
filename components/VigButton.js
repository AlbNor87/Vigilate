import React from 'react';
import { Text, TouchableHighlight, StyleSheet, View } from 'react-native';
import Variables from '../constants/Variables';

export default class VigButton extends React.Component {

  state = {
    isActive: false,
  }
  
  render() {
    if(this.props.type.toLowerCase() == "hollow") {
      return (
        <TouchableHighlight style={buttonStyles.container}
          onPress={this.props.onPress}
          onShowUnderlay={() => this.setState({ isActiveHollow: true})}
          onHideUnderlay={() => this.setState({ isActiveHollow: false})}
          underlayColor="transparent"
          >

          <View style={(this.state.isActiveHollow) ? buttonStyles.solid : buttonStyles.hollow}>

            <Text
            style={(this.state.isActiveHollow) ? buttonStyles.solidText : buttonStyles.hollowText}
            >{this.props.value}</Text>

          </View>

        </TouchableHighlight>
      );
    } else {
      return (
        <TouchableHighlight style={buttonStyles.container}
          onPress={this.props.onPress}
          onShowUnderlay={() => this.setState({ isActiveHollow: true})}
          onHideUnderlay={() => this.setState({ isActiveHollow: false})}
          underlayColor="transparent"
          >

          <View style={(this.state.isActiveHollow) ? buttonStyles.hollow : buttonStyles.solid}>

            <Text
            style={(this.state.isActiveHollow) ? buttonStyles.hollowText : buttonStyles.solidText}
            >{this.props.value}</Text>

          </View>
          
        </TouchableHighlight>
      );
    }
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
    width: '100%',
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
    color: Variables.secondaryColor,
  },
  hollow: {
    margin: 10,
    width: '100%',
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

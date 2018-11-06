import React from 'react';
import { Text, TouchableHighlight, StyleSheet, View } from 'react-native';
import Variables from '../constants/Variables';


export default class VigButton extends React.Component {

  constructor(props){
    super(props);
  
    this.state = {
      width: '100%',
      fontSize: 24
    }

  }

  componentWillMount(){
    if(this.props.width){
      this.setState({
        width: this.props.width
      })
    }
    if(this.props.fontSize){
      this.setState({
        fontSize: this.props.fontSize
      })
    }
    if(this.props.fontColor){
      this.setState({
        fontColor: this.props.fontColor
      })
    }
    if(this.props.margin){
      this.setState({
        margin: this.props.margin
      })
    }
  }

  // componentDidMount() {
  //   console.log('vigbutton state: ', this.state)
  // }


  state = {
    isActive: false,
  }
  
  render() {
    if(this.props.type.toLowerCase() == "hollow") {
      return (
        <TouchableHighlight 
          style={[buttonStyles.container,{ width: this.state.width, margin: this.state.margin}]}
          onPress={this.props.onPress}
          onShowUnderlay={() => this.setState({ isActive: true})}
          onHideUnderlay={() => this.setState({ isActive: false})}
          underlayColor="transparent"
          >

          <View style={(this.state.isActive) ? buttonStyles.solid : buttonStyles.hollow}>

            <Text
            style={(this.state.isActive) ? [buttonStyles.solidText,{ fontSize: this.state.fontSize}] : [buttonStyles.hollowText,{ fontSize: this.state.fontSize}]}
            >{this.props.value}</Text>

          </View>

        </TouchableHighlight>
      );
    } else {
      return (
        <TouchableHighlight style={[buttonStyles.container,{ width: this.state.width}]}
          onPress={this.props.onPress}
          onShowUnderlay={() => this.setState({ isActive: true})}
          onHideUnderlay={() => this.setState({ isActive: false})}
          underlayColor="transparent"
          >

          <View style={(this.state.isActive) ? buttonStyles.hollow : buttonStyles.solid}>

            <Text
            style={(this.state.isActive) ? [buttonStyles.hollowText,{ fontSize: this.state.fontSize}] : [buttonStyles.solidText,{ fontSize: this.state.fontSize, color: this.state.fontColor}]}
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
    marginHorizontal: 2,
  },
  solid: {
    width: '100%',
    height: 50,
    backgroundColor: Variables.primaryColor,
    // borderColor: Variables.secondaryColor,
    // borderWidth: 1,
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

import React from 'react';
import { Text, TouchableHighlight, StyleSheet, View } from 'react-native';
import Variables from '../constants/Variables';
import { colors } from 'react-native-elements';
import Image from 'react-native-remote-svg';

export default class VigButton extends React.Component {

  constructor(props){
    super(props);
  
    this.state = {
      value: 0,
      category: '',
    }

  }

  componentWillMount(){
    if(this.props.category){
      this.setState({
        category: this.props.category
      })
    }
  }

  _testit(){
    console.log('Det verkar änna funka vettu! Value: ', this.state.value);
    console.log(this.state);
    this.setState({
      value: 0
    })
  }

  _resetInput(){
    console.log('reset input triggered');

    this.setState({
      value: 0
    })
  }

  // componentDidMount() {
  //   console.log('VigNumInput: ', this.state)
  // }

  _add() {
    const category = this.state.category.toLowerCase();
    const value = this.state.value + 5;
    this.setState({
      value: value
    })
    
    this.props.triggerParentUpdate(category, value);
  }

  _subtract() {
    const category = this.state.category.toLowerCase();
    const value = this.state.value - 5;
    this.setState({
      value: value
    })
    
    this.props.triggerParentUpdate(category, value);
  }

  _log(){
    console.log(this.state)
  }
  
  render() {
    return (
        <View style={screenStyles.container}>
        <Image 
        source={require('../assets/images/simple.svg')}
        style={{width: 130,}}
        // style={screenStyles.spinner}
        />
        {/* <Text style={screenStyles.text}>Loading</Text> */}
      </View>
    );
  }
}

const screenStyles = StyleSheet.create({
    text: {
        marginTop: -50,
        fontSize: 24,
        color: Variables.tertiaryColor,
        textAlign: "center"
      },
      container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 120,
        // textAlign: "center"
    
      }
});

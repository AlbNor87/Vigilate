import React from 'react';
import { Text, TouchableHighlight, StyleSheet, View } from 'react-native';
import Variables from '../constants/Variables';
import { colors } from 'react-native-elements';


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
      <View style={styles.container}>
  
      <TouchableHighlight
      underlayColor="transparent"
      onPress={() => this._subtract()}>
        <View style={styles.subtract} >
          <Text style={styles.textButton}> - </Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight onPress={() => this._log()}>
        <View style={styles.display}>
          <Text style={styles.text}>{this.state.value}</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
      underlayColor="transparent" 
      onPress={() => this._add()}>
        <View style={styles.add} >
          <Text style={styles.textButton}> + </Text>
        </View>
      </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  display: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Variables.primaryColor,
  },
  subtract: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    flex: 1,
    backgroundColor: Variables.primaryColor,
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
  },
  add: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: 60,
    backgroundColor: Variables.primaryColor,
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
  },
  text: {
    fontSize: 17,
    textAlign: 'center',
    color: Variables.tertiaryColor,
  },
  textButton: {
    fontSize: 20,
    textAlign: 'center',
    color: Variables.tertiaryColor,
  },
  container: {
    width: 180,
    height: 50,
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
  },
});

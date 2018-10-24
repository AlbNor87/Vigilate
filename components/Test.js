import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Test extends Component {
  render() {
    return (
    <View>
      <Text style={styles.text} >Hello world!</Text>
    </View>

    );
  }
}

const styles = StyleSheet.create({
    text: {
        color: 'green',
    }
})
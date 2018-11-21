import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Text,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  View,
  StatusBar,
} from 'react-native';
import Variables from '../constants/Variables';
import { styles } from '../assets/styles/Styles';
import { LinearGradient } from 'expo';
import VigButton from '../components/VigButton';
import * as firebase from 'firebase';

export default class AddCategoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'Add Category'),
      headerTintColor: Variables.primaryColor,
      headerStyle: { 
        backgroundColor: Variables.secondaryColor,
        borderBottomWidth: 0,
       },
      headerTitleStyle: { color: Variables.tertiaryColor },
    };
  };

  state = {
    isActiveInputCategoryName: false,
    categoryName: '',
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', payload => {this._onEnter();
    });
  }

  _onEnter() {
    console.log('You entered Add Category Screen');
    this.refs.txtCategoryName.focus();
  }

  _addCategory() {
    // console.log('name: ', this.state.categoryName);
    var userId = firebase.auth().currentUser.uid;

    console.log('Userid:', userId);

    const categoriesRef = firebase.database().ref('categories').child(userId);
    const newCategoryRef = categoriesRef.push();

    newCategoryRef.set({
      name: this.state.categoryName,
    })

    // newCommitsRef.set({
    //   name: this.state.categoryName,
    // })

    this.props.navigation.navigate('Categories');


  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content"/>
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <LinearGradient 
            colors={[ Variables.primaryColor , 'black']} 
            style={styles.gradientContainerCenter}
            start={[0,0]}
            end={[0,0.8]}
            >

            <View style={styles.contentContainer}>
                <View style={styles.buttonContainer}>

                  <Text style={screenStyles.title}>Add category</Text>

                  <TextInput 
                  style={(this.state.isActiveInputCategoryName) ? styles.textInputActive : styles.textInput}
                  onChangeText={(value) => this.setState({categoryName: value.trim()})}
                  onFocus={() => this.setState({ isActiveInputCategoryName: true})}
                  onBlur={() => this.setState({ isActiveInputCategoryName: false})} 
                  placeholder="Category name"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  returnKeyType="go"
                  autoCorrect={false}
                  onSubmitEditing={this._addCategory.bind(this)}
                  ref={"txtCategoryName"}
                  selectionColor={Variables.tertiaryColor}
                  />

                  <TextInput 
                  style={styles.textInput}
                  onChangeText={(value) => this.setState({categoryName: value.trim()})}
                  // onFocus={() => this.setState({ isActiveInputCategoryName: true})}
                  // onBlur={() => this.setState({ isActiveInputCategoryName: false})} 
                  placeholder="Measured in (minutes)"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  returnKeyType="go"
                  autoCorrect={false}
                  onSubmitEditing={this._addCategory.bind(this)}
                  ref={"txtCategoryName"}
                  selectionColor={Variables.tertiaryColor}
                  editable={false} selectTextOnFocus={false}
                  />

                   <VigButton
                  type='solid'
                  margin={10}
                  onPress={this._addCategory.bind(this)}
                  value='Add Category'/>

                  <VigButton
                  type='hollow'
                  margin={10}
                  onPress={() => this.props.navigation.goBack()}
                  value='Go back'/>

                </View>
              </View>


            </LinearGradient>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

//Screen specific styles...
const screenStyles = StyleSheet.create({
  title: {
    fontSize: 39,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
});

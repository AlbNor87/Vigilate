import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  View,
  StatusBar,
  FlatList,
  Text,
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';
import Variables from '../constants/Variables';
import { styles } from '../assets/styles/Styles';
import { LinearGradient } from 'expo';
import VigButton from '../components/VigButton';
import VigNumInput from '../components/VigNumInput';
import * as firebase from 'firebase';
import { firebaseApp } from '../App.js';

export default class ActivityScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'Activity'),
      headerTintColor: Variables.primaryColor,
      headerStyle: { 
        backgroundColor: Variables.secondaryColor,
        borderBottomWidth: 0,
       },
      headerTitleStyle: { color: Variables.tertiaryColor },
    };
  };

  constructor(props) {
    super(props);
    this.state = {
        categoryDataSource: [],
    }
    var userId = firebase.auth().currentUser.uid;
    this.categoriesRef = this.getRef().child('categories').child(userId);
  }
  
  getCategories(categoriesRef) {

    categoriesRef.on('value', (snap) => {
        let categories = [];
        snap.forEach((child) => {
          categories.push({
                name: child.val().name,
                _key: child.key,
            });
        });

        this.setState({
            categoryDataSource: categories
        });

        const that = this;
        categories.forEach(function(category){

          const categoryName = category.name.toLowerCase();
          that.setState({...this.state, [categoryName]: 0 })

        })

    });

  }
  
  getRef() {
    return firebaseApp.database().ref();  
  }

  componentDidMount() {
    this.getCategories(this.categoriesRef);
    this.props.navigation.addListener('willFocus', payload => {this._onEnter();
    });
  }

  _onEnter() {
    console.log('You entered Activity Screen');
  
  }

  _loadColor() {
    console.log('LoadColor Triggered!');
    Variables.primaryColor = 'red';
    this.setState({
      colorChanged: !this.state.colorChanged,
    })
    console.log('colorChanged: ', this.state.colorChanged)
  }

  _log() {
    console.log('thisState: ', this.state)
  }

  _onChanged(value, item){

    const categoryName = item.name.toLowerCase();
    this.setState({
      [categoryName]: value
    })
    console.log('this.state: ', this.state);
    // console.log('Value: ', value);
    // console.log('Item: ', item.name)

  }

  _report(item){
    
    // console.log('name: ', item.name);
    // console.log('This state: ', this.state);

    //Input
    const category = item.name.toLowerCase();
    const categoryId = item._key;
    const value = this.state[category];

    //Date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    const date = mm + '/' + dd + '/' + yyyy;
    console.log('Current Date: ', date);

    const timeStamp = Date.now();
    const userId = firebase.auth().currentUser.uid;
    const commitsRef = firebase.database().ref('commits').child(userId);
    const newCommitsRef = commitsRef.push();
    newCommitsRef.set({
      userId: userId,
      category: category,
      categoryId: categoryId,
      date: date,
      timeStamp: timeStamp,
      value: value
    })

    console.log('Report triggered for', category, 'with a value of ', value);

    this.setState({
      [category]: 0
    })

    this[category]._resetInput();

    Alert.alert(
      'Report sent',
      'Category: ' + item.name +'\n Minutes: ' + value,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )

  }

  _updateThisCounter(category, value){
    this.setState({
      [category]: value,
    })  
  }

  _sorry(){
    alert("This doesn't work yet, sorry!")
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content"/>
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
          {/* <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}> */}
            <LinearGradient 
            colors={[ Variables.primaryColor , 'black']} 
            style={screenStyles.gradientContainer}
            start={[0,0]}
            end={[0,0.8]}
            >

              {/* <ActivityIndicator animating size ="large" /> */}
             
                <FlatList
                    onPress={Keyboard.dismiss}
                    data={this.state.categoryDataSource}
                    keyExtractor={item => item._key.toString()}
                    renderItem={({item}) => {
                      
                      // const categoryRef = item.name.toLowerCase();
                      const category = item.name.toLowerCase();
                      // this.ref[category] = React.createRef();

                      return (
                        <View style={screenStyles.li}> 
                        <Text style={screenStyles.liText}>{item.name}</Text>
                        
                        <View style={screenStyles.reportContainer}>                          

                          <VigNumInput ref={instance => { this[category] = instance; }} category={category} triggerParentUpdate={this._updateThisCounter.bind(this)}/>

                          <VigButton
                          type='solid'
                          onPress={this._sorry}
                          width={50}
                          value='+30'
                          fontSize={16}
                          fontColor={Variables.tertiaryColor}
                          />

                          <VigButton
                          type='solid'
                          onPress={() => this._report(item)}
                          // onPress={this._log.bind(this)}
                          width="30%"
                          value='Report'
                          fontSize={17}
                          fontColor={Variables.tertiaryColor}
                          />

                        </View>

                      </View>
                      );

                      
                    }}
                    extraData={this.state}
                />            

                <View style={screenStyles.contentContainer}>
                <View style={styles.buttonContainer}>

                  {/* <VigButton
                  type='solid'
                  onPress={() => this.props.navigation.navigate('AddCategory')}
                  value='Add category'/> */}

                  {/* <VigButton
                  type='hollow'
                  onPress={this._log.bind(this)}
                  value='Log'/> */}

                </View>
              </View>

            </LinearGradient>
          {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const screenStyles = StyleSheet.create({
  reportContainer: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  gradientContainer: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  li: {
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomColor: Variables.primaryColor,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 12,
  },
  liText: {
    fontSize: 22,
    fontWeight: "bold",
    color: Variables.tertiaryColor
  },
});

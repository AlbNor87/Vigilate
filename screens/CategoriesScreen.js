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
  ListView,
  FlatList,
  Text,
  ActivityIndicator,
  Alert
} from 'react-native';
import { List, ListItem } from "react-native-elements";
import Variables from '../constants/Variables';
import { styles } from '../assets/styles/Styles';
import { LinearGradient } from 'expo';
import VigButton from '../components/VigButton';
import * as firebase from 'firebase';
import { firebaseApp } from '../App.js';

export default class CategoriesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'Categories'),
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
    let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2 });
    this.state = {
        categoryDataSource: ds,
        categoryDataSource2: [],
        colorChanged: false,
    }
    var userId = firebase.auth().currentUser.uid;
    this.categoriesRef = this.getRef().child('categories').child(userId);
    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
  }
  
  getCategories(categoriesRef) {

    categoriesRef.on('value', (snap) => {
        let categories = [];
        snap.forEach((child) => {
            categories.push({
                name: child.val().name,
                _key: child.key
            });
        });
        // console.log('categories array: ', categories);
        this.setState({
            categoryDataSource: this.state.categoryDataSource.cloneWithRows(categories),
            categoryDataSource2: categories
        });
    });

  }
  
  getRef() {
    return firebaseApp.database().ref();  
  }

  componentWillMount() {
    // this.getCategories(this.categoriesRef);
    this.props.navigation.addListener('willFocus', payload => {this._onEnter();
    });
  }

  

  pressRow(category) {
    console.log(category);
  }

  renderRow(category) {
    return (
        <TouchableHighlight onPress={() => {
            this.pressRow(category);
        }}>
            <View style={screenStyles.li}>
                <Text style={screenStyles.liText}>{category.name}</Text>
            </View>
        </TouchableHighlight>
    );
  }

  componentDidMount() {
    this.getCategories(this.categoriesRef);
    this.props.navigation.addListener('willFocus', payload => {this._onEnter();
    });
  }

  _onEnter() {
    console.log('You entered Categories Screen');
  
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
    console.log('DataSource2: ', this.state.categoryDataSource2)
  }

  _deleteCategory(item) {
    const userId = firebase.auth().currentUser.uid;
    const categoryId = item._key;
    const categoryRef = firebase.database().ref('categories').child(userId).child(categoryId);

    Alert.alert(
      'Confirm deletion',
      'Are you sure you want to do this? All category data will be permanently deleted.',
      [
        {text: 'Ok', onPress: () => categoryRef.remove()
        .then(function() {
          console.log("Remove succeeded.")
        })
        .catch(function(error) {
          console.log("Remove failed: " + error.message)
        })
      },
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: true }
    )

    // categoryRef.remove()
    // .then(function() {
    //   console.log("Remove succeeded.")
    // })
    // .catch(function(error) {
    //   console.log("Remove failed: " + error.message)
    // });

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
                    data={this.state.categoryDataSource2}
                    keyExtractor={item => item._key.toString()}
                    renderItem={({item}) =>
                    <View style={screenStyles.li}> 
                      <Text style={screenStyles.liText}>{item.name}</Text>
                      <Text
                      style={screenStyles.liTextDelete}
                      onPress={this._deleteCategory.bind(this, item)}
                      >DELETE</Text>
                    </View>
                    }
                />            

                <View style={screenStyles.contentContainer}>
                <View style={styles.buttonContainer}>

                  <VigButton
                  type='solid'
                  onPress={() => this.props.navigation.navigate('AddCategory')}
                  value='Add category'/>

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
  gradientContainer: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  container: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  li: {
    width: "100%",
    borderBottomColor: Variables.primaryColor,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    borderWidth: 1,
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  liText: {
      fontSize: 22,
      fontWeight: "bold",
      color: Variables.tertiaryColor
  },
  liTextDelete: {
    fontSize: 22,
    fontWeight: "bold",
    color: 'black',
},
  contentContainer: {
    padding: 8,
    paddingHorizontal: 45,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  bgColor: {
    backgroundColor: 'transparent'
  },
});

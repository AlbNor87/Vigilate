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
import Variables from '../constants/Variables';
import { styles } from '../assets/styles/Styles';
import { LinearGradient } from 'expo';
import VigButton from '../components/VigButton';
import VigSpinner from '../components/VigSpinner';
import * as firebase from 'firebase';
import { firebaseApp } from '../App.js';


export default class OverviewScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'Overview'),
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
        overviewDataSource: [
          {
            categoryName: 'test',
            numberOfCommits: 7,
            totalValue: 25,
            _key: 2178
          }
        ],
        isLoading: true,
    }
    var userId = firebase.auth().currentUser.uid;
    this.categoriesRef = this.getRef().child('categories').child(userId);
    this.commitsRef = this.getRef().child('commits').child(userId);
  }

  async _getCategories(categoriesRef) {

    let promise = new Promise((resolve, reject) => {

      categoriesRef.on('value', (snap) => {
        let categories = [];
        snap.forEach((child) => {
          console.log('child', child);
          console.log('child-key', child.key);

            categories.push({
                name: child.val().name.toLowerCase(),
                _key: child.key
            });
        });
        resolve(categories);
      });

    });

    let result = await promise;
    return result;
  }

  async _getData(commitsRef, categoriesRef){

  //   this.setState({
  //     overviewDataSource: [
  //       {
  //         categoryName: 'Reset',
  //         numberOfCommits: 0,
  //         totalValue: 0,
  //         _key: 2178
  //       }
  //     ],
  //   }
  // )

    // console.log('GetData triggered');
    // console.log('This.state: ', this.state);

    const categories = await this._getCategories(categoriesRef);
    let overviewDataSource = [];

    const that = this;

    // console.log('that: ', that);
  
    //Loop through all commits in each and every category...
    categories.forEach((category, index) => {


      // console.log('Looping through category: ', index);
      // console.log('CategoryName: ', category.name);
      // console.log('Category key: ', category._key);

      const query = new Promise(function(resolve, reject) {
          let query = commitsRef.orderByChild('categoryId').equalTo(categories[index]._key);
          // let query = commitsRef.orderByChild('categoryId').equalTo(categories[index]._key);
          resolve(query);
      });

      let numberOfCommits = 0;
      let totalValue = 0;
      let timeStamp = 0;
      // let totalValue2 = 0;
      
      query.then((query)=>{
        query.on('value', snap => {
          //For each commit...
          snap.forEach((child) => {
              numberOfCommits++;
              totalValue = totalValue + child.val().value;
              timeStamp = child.val().timeStamp;
              // console.log('Child in looop: ', child)
              // console.log('TimeStamp: ', timeStamp)
              // console.log('Total value: ', totalValue)
              // console.log('numberOfCommits: ', numberOfCommits)
          });

          const categoryInfo =  {
              categoryName: category.name, 
              numberOfCommits: numberOfCommits,
              totalValue: totalValue,
              _key: timeStamp + Math.random()
            }

          overviewDataSource.push(categoryInfo);
          // const that = this;
          // this.setState({
          //   isLoading: false
          // })

          // console.log('overviewDataSource: ', overviewDataSource);

          that.setState(
            {...that.state, 
              overviewDataSource: overviewDataSource,
              isLoading: false}
          )
          
          // console.log('overviewDataSource: ', overviewDataSource);
          // console.log('NewDataSource (banan predicted): ', newDataSource)

          // newDataSource = overviewDataSource;
          // console.log('NewDataSource: ', newDataSource)
          
          

        });

      })
    })
    // console.log('overviewDataSource: ', overviewDataSource);
    // console.log('this.overviewDataSource before set: ', this.state.overviewDataSource);
    // that.setState(
    //   {overviewDataSource: newDataSource }
    // )
    // console.log('this.overviewDataSource after set: ', this.state.overviewDataSource);
  }
  
  getRef() {
    return firebaseApp.database().ref();  
  }

  componentDidMount() {
    // this.getData(this.commitsRef, this.categoriesRef);
    this.props.navigation.addListener('willFocus', payload => {this._onEnter();
    });
  }

  _onEnter() {
    console.log('You entered Overview Screen');
    this._getData(this.commitsRef, this.categoriesRef);
  
  }

  _log() {
    // console.log('DataSource2: ', this.state.categoryDataSource)
  }

  _update(){
    console.log('Update triggered');
    this.setState({
      overviewDataSource: [
        {
          categoryName: 'Uppdaterad',
          numberOfCommits: 7,
          totalValue: 25,
        }
      ],
    })
  }
  _false(){
    console.log('False triggered');
    this.setState({
      isLoading: false
    })
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
             {/* { this.state.isLoading ? <ActivityIndicator size="large" /> : null } */}
             { this.state.isLoading ? <VigSpinner/> : 
             
             <FlatList
             data={this.state.overviewDataSource}
             keyExtractor={item => item._key.toString()}
             renderItem={({item}) => {

               // console.log('item overview', item)

               return(
                 <View style={screenStyles.li}> 
                   <Text style={screenStyles.liText}>{item.categoryName}</Text>
                   <View style={screenStyles.infoWrapper}> 
                    <View style={screenStyles.infoContainer}>
                      <Text style={screenStyles.liTextInfoFat}>Today</Text>
                      <Text style={screenStyles.liTextInfo}>Reports: {item.numberOfCommits}</Text>
                      <Text style={screenStyles.liTextInfo}>Total: {item.totalValue} </Text>
                    </View>

                    <View style={screenStyles.infoContainer}>
                      <Text style={screenStyles.liTextInfoFat}>Week</Text>
                      <Text style={screenStyles.liTextInfo}>Reports: {item.numberOfCommits}</Text>
                      <Text style={screenStyles.liTextInfo}>Total: {item.totalValue} </Text>
                    </View>

                    <View style={screenStyles.infoContainer}>
                      <Text style={screenStyles.liTextInfoFat}>Ever</Text>
                      <Text style={screenStyles.liTextInfo}>Reports: {item.numberOfCommits}</Text>
                      <Text style={screenStyles.liTextInfo}>Total: {item.totalValue} </Text>
                    </View>
                   </View>
                 </View>
                 )
               }
             }
           extraData={this.state}
         />  
            
            }

              {/* <View style={styles.activityIndicatorContainer}> */}
                {/* <ActivityIndicator animating={this.state.isLoading} size="large" color={Variables.tertiaryColor}/> */}
              {/* </View> */}

                          

                <View style={screenStyles.contentContainer}>
                <View style={styles.buttonContainer}>

                  {/* <VigButton
                  type='solid'
                  onPress={() => this.props.navigation.navigate('AddCategory')}
                  value='Add category'/> */}

                  {/* <VigButton
                  type='hollow'
                  onPress={this._update.bind(this)}
                  value='Update Flatlist'/> */}
                  
                  {/* <VigButton
                  type='hollow'
                  onPress={this._false.bind(this)}
                  value='False'/> */}

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
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liText: {
      fontSize: 26,
      fontWeight: "bold",
      color: Variables.tertiaryColor
  },
  liTextInfo: {
    fontSize: 16,
    // fontWeight: "bold",
    color: Variables.tertiaryColor,
},
liTextInfoFat: {
  fontSize: 20,
  fontWeight: "bold",
  color: Variables.tertiaryColor,
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
  infoContainer: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginHorizontal: 15,
  },
  infoWrapper: {
    width: "100%",
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignItems: 'center',
  }
});

import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ListView,
  Button
} from 'react-native';
import { WebBrowser } from 'expo';

import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBiPRK6dSTVxy2gvRnd4vV6kNHlsOCJmIY",
    authDomain: "vigilate-e05ea.firebaseapp.com",
    databaseURL: "https://vigilate-e05ea.firebaseio.com",
    projectId: "vigilate-e05ea",
    storageBucket: "vigilate-e05ea.appspot.com"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class ItemsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
      super();
      let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2 });
      this.state = {
          itemDataSource: ds
      }
      this.itemsRef = this.getRef().child('items');
      this.renderRow = this.renderRow.bind(this);
      this.pressRow = this.pressRow.bind(this);
  }

  getRef() {
      return firebaseApp.database().ref();  
  }

  componentWillMount() {
      this.getItems(this.itemsRef);
      this.props.navigation.addListener('willFocus', payload => {this._onEnter();
      });
  }

  _onEnter() {
    console.log('You entered ItemScreen');
  }

  componentDidMount() {
      this.getItems(this.itemsRef);
  }

  getItems(itemsRef) {

    itemsRef.on('value', (snap) => {
        let items = [];
        snap.forEach((child) => {
            items.push({
                title: child.val().title,
                _key: child.key
            });
        });
        console.log('items array: ', items);
        this.setState({
            itemDataSource: this.state.itemDataSource.cloneWithRows(items)
        });
    });

  }

  pressRow(item) {
      console.log(item);
  }

  renderRow(item) {
    return (
        <TouchableHighlight onPress={() => {
            this.pressRow(item);
        }}>
            <View style={styles.li}>
                <Text style={styles.liText}>{item.title}</Text>
            </View>
        </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>Welcome!</Text>

        <ListView
        dataSource={this.state.itemDataSource}
        renderRow={this.renderRow}
        />

        <Button
          onPress={() => this.props.navigation.goBack(null)}   // 4. click on this
          title="Go back"
          style={{ marginTop: 50 }}
        />

        <View style={styles.buttonContainer}>
        
        </View>

      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  li: {
        width: "100%",
        borderBottomColor: "#eee",
        borderColor: 'transparent',
        borderWidth: 1,
        padding: 16,
    },
  liText: {
        fontSize: 22,
        fontWeight: "bold",
        width: "100%",
        color: "dodgerblue",
    },
  buttonContainer: {
    marginTop: 200,
    width: "100%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 15,
    width: '60%',
    backgroundColor: 'rgba(0, 102, 255,1.0)',
    padding: 10,
    borderRadius: 100
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "300",
    textAlign: 'center',
    color: '#ffffff',
  },
  add: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: 'rgba(0, 102, 255,1.0)',
    padding: 10,
    borderRadius: 10
  },
  title: {
    width: '100%',
    fontSize: 46,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#000000',
    padding: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#222222',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  SignUpScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

import { StyleSheet } from 'react-native';
import Variables from '../../constants/Variables';

export const styles = StyleSheet.create({
  gradientContainer: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  // mainContainer: {
  //   position: 'relative',
  //   flex: 1,
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  inputContainer: {
    paddingBottom: 4,
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 20,
    color: Variables.titleColor,
    padding: 10,
    paddingHorizontal: 25,
    margin: 10,
    width: '90%',
    height: 50,
    backgroundColor: Variables.backgroundColorSemiTransparent,
    borderRadius: 100,
  },
  textInputActive: {
    fontSize: 20,
    color: Variables.titleColor,
    padding: 10,
    paddingHorizontal: 25,
    margin: 10,
    width: '90%',
    height: 50,
    backgroundColor: Variables.backgroundColorSemiTransparent,
    borderColor: Variables.titleColor,
    borderWidth: 1,
    borderRadius: 100,
  },
  title: {
    // position: 'absolute',
    // zIndex: 2,
    // left: 0,
    // right: 0,
    // top: 0,
    marginTop: 30,
    width: '100%',
    fontSize: 46,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    padding: 10
  },
  container: {
    flex: 1,
    backgroundColor: Variables.backgroundColorDark,
    display: 'flex',
    flexDirection: 'column',
  },
  keyboardAvoindingContainer: {
    flex: 1,
    backgroundColor: Variables.backgroundColorDark,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
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
    padding: 45,
    paddingTop: 8,
    paddingBottom: 35,
    width: '100%',
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
    width: '100%',
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
    width: '100%',
    height: 50,
    backgroundColor: Variables.backgroundColorSemiTransparentThick,
    borderColor: Variables.titleColor,
    borderWidth: 1,
    borderRadius: 100,
  },
  title: {
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
    backgroundColor: Variables.secondaryColor,
    display: 'flex',
    flexDirection: 'column',
  },
  keyboardAvoindingContainer: {
    flex: 1,
    backgroundColor: Variables.secondaryColor,
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
  contentContainer: {
    padding: 45,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
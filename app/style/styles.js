import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea'
  },
  measureContainer: {
    paddingTop: 50,
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: {
    backgroundColor: 'rgb(59, 154, 226)',
    paddingTop: 30
  },
  titleText: {
    fontSize: 40,
    padding: 10
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    width: 300,
    height: 80,
    backgroundColor: 'rgb(59, 154, 226)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: 'white'
  },
  map: {
    paddingTop: 10,
    flex: 1
  },
  recordFields: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },
  recordDigits: {
    fontSize: 100,
    marginTop: 30
  },
  recordHeaders: {
    fontSize: 20
  },
  backBtnContainer: {
    paddingTop: 50,
    width: 80,
  },
  backBtnText: {
    fontSize: 24,
    paddingLeft: 20,
    color: 'rgb(59, 154, 226)'
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  },
  openModalBtn: {
    fontSize: 24,
    color: '#FF5F5F',
    marginTop: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 35,
    paddingVertical: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalText: {
    fontSize: 25
  },
  modalBtns: {
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 120,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBtnsText: {
    fontSize: 20,
    color: 'white'
  },
  cancelBtn: {
    marginRight: 30,
    backgroundColor: 'rgb(59, 154, 226)'
  },
  deleteBtn: {
    backgroundColor: '#FF5F5F'
  },
  stoppedAlert: {
    backgroundColor: 'rgb(59, 154, 226)',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  stoppedAlertText: {
    fontSize: 20,
    paddingVertical: 10
  },
  errorMsg: {
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingTop: 80
  },
  errorMsgText: {
    fontSize: 25
  },
  scrollView: {
    alignItems: 'center'
  },
  newBtnContainer: {
    position: 'absolute', 
    bottom: 50,
    left: 0,
    right: 0
  },
  runView: {
    marginBottom: 15,
    width: '100%',
    backgroundColor: 'white'
  },
  runName: {
    fontSize: 25, 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    fontWeight: '400'
  },
  runDateTime: {
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  runDateTimeText: {
    paddingHorizontal:5
  },
  runDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10
  },
  runDataTitle: {
    fontSize: 15,
    fontWeight: '100',
    textAlign: 'left',
    paddingLeft: 10
  },
  runData: {
    width: 130,
    textAlign: 'center',
    fontSize: 20
  },
  verticleLine:{
    height: '90%',
    width: 1,
    backgroundColor: '#909090',
  },
  feelingBtns: {
    paddingHorizontal: 40, 
    paddingVertical: 10, 
    borderRadius: 10, 
    marginHorizontal: 10,
    borderWidth: 2
  }
});
export { styles }
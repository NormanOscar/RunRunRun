import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    newRecordingBtnContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10
    },
    newRecordingBtn: {
      width: 200,
      backgroundColor: 'rgb(59, 154, 226)',
      paddingVertical: 5,
      alignItems: 'center',
      borderRadius: 50
    },
    newRecordingBtnText: {
      fontSize: 40,
      color: 'white'
    },
    title: {
      fontSize: 40,
      padding: 10
    },
    image: {
      width: 70,
      height: 70,
      borderRadius: 20
    },
    text: {
      fontSize: 50
    },
    startBtnContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 0.4
    },
    startBtn: {
      backgroundColor: 'rgb(59, 154, 226)',
      paddingVertical: 25,
      paddingHorizontal: 72,
      borderRadius: 50,
    },
    startBtnText: {
      fontSize: 25,
      fontWeight: 'bold',
      letterSpacing: 1,
      color: 'white'
    },
    map: {
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
      flex: 0.8,
      fontSize:100,
      marginTop: 30
    },
    recordHeaders: {
      fontSize: 20
    },
    finishBtnContainer: {
      flex: 0.4,
      justifyContent: 'center',
      alignItems: 'center'
    },
    finishBtn: {
      width: 300,
      paddingVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },
    finishBtnText: {
      fontSize: 25,
      fontWeight: 'bold',
      letterSpacing: 3,
      color: 'white'
    },
    backBtn: {
      paddingTop: 50,
      paddingBottom: 10,
      width: 80,
    },
    stoppedBtnContainer: {
      flex: 0.5,
      flexDirection: 'row'
    },
    stoppedBtns: {
      marginHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 50
    },
    stoppedBtnsText: {
      fontSize: 30
    },
    stoppedResumeBtn: {
      backgroundColor: '#8AFF5F'
    },
    stoppedFinishBtn: {
      backgroundColor: '#FF5F5F'
    },
    input: {
      width: '90%',
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      marginBottom: 20
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
      elevation: 5,
    },
    button: {
      marginTop: 20,
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    cancelBtn: {
      marginRight: 30,
      backgroundColor: 'rgb(59, 154, 226)'
    },
    deleteBtn: {
      backgroundColor: '#FF5F5F'
    }
});
export { styles }
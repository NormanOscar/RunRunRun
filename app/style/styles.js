import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    newRecordingBtnContainer: {
      justifyContent: 'center',
      alignItems: 'center',
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
      paddingTop: 50,
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
      fontSize:100
    },
    recordHeaders: {
      marginBottom: 30,
      fontSize: 20
    },
    finishBtnContainer: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    finishBtn: {
      width: 300,
      backgroundColor: '#FF5F5F',
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
    }
});
export { styles }
import { Text, View, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from '../style/styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen({ navigation }) {
  //AsyncStorage.clear();

  let savedData = null;

  const getData = async () => {
    try {
      const storageData = await AsyncStorage.getItem("savedData");
      savedData = JSON.parse(storageData);

      displayRuns();

    } catch (error) {
      console.log(error);
    }
  }
  getData();

  const displayRuns = () => {
    for (const run of savedData) {
      console.log(run);
    }
  }

  /* const [data, setData] = useState();

  useEffect( async () => {
      try {
        const savedData = await AsyncStorage.getItem("savedData");
        const allRunData = JSON.parse(savedData);
        console.log(allRunData);
        //setData(allRunData[0].name);
      } catch (error) {
        console.log(error);
      }
  }, []); */

  return (
    <View style={styles.container}>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>RunRunRun</Text>
      </View>

      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.9,
      }}>

        <Text style={styles.titleText}>Home</Text>
      </View>
      <View style={[
        styles.btnContainer,
        { zIndex: 50 }
      ]}>
        <Pressable style={styles.btn} onPress={() => navigation.navigate('Record')}>
          <Text style={styles.btnText}>New</Text>
        </Pressable>
      </View>
    </View>
  );
}
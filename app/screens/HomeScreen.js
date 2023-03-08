import { Text, View, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from '../style/styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen({ navigation }) {
  const [data, setData] = useState();

  useEffect( async () => {
      try {
        const savedData = await AsyncStorage.getItem("savedData");
        const allRunData = JSON.parse(savedData);
        console.log(allRunData);
        //setData(allRunData[0].name);
      } catch (error) {
        console.log(error);
      }
  }, []);
  
  return (
    <View style={styles.container}>

      <View style={{
        backgroundColor: 'rgb(59, 154, 226)',
        paddingTop: 50
      }}>
        <Text style={styles.title}>RunRunRun</Text>
      </View>

      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.9
      }}>

        <Text style={styles.text}>Home</Text>
      </View>
      <View style={styles.newRecordingBtnContainer}>
        <Pressable style={styles.newRecordingBtn} onPress={() => navigation.navigate('Record')}>
          <Text style={styles.newRecordingBtnText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}
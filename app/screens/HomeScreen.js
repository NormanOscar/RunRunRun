import { Text, View, Pressable } from 'react-native';
import { styles } from '../style/styles.js';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      <View style={{
        backgroundColor: 'rgb(59, 154, 226)'
      }}>
        <Text style={styles.title}>RunRunRun</Text>
      </View>
      
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex:0.9
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
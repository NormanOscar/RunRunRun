import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './app/screens/HomeScreen';
import RecordScreen from './app/screens/RecordScreen';
import SaveScreen from './app/screens/SaveScreen';

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Navigator 
          initialRouteName='Home'
          screenOptions={{ 
            headerShown: false
          }}
        >
            <Screen name='Home' component={HomeScreen}></Screen>
            <Screen name='Record' component={RecordScreen}></Screen>
            <Screen name='Save' component={SaveScreen}></Screen>
        </Navigator>
    </NavigationContainer>
  );
}
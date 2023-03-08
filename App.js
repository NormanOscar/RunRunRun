import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './app/screens/HomeScreen';
import RecordScreen from './app/screens/RecordScreen';

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
            <Screen name='Home' component={HomeScreen}></Screen>
            <Screen name='Record' component={RecordScreen}></Screen>
        </Navigator>
    </NavigationContainer>
  );
}
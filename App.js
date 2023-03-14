import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './app/screens/SplashScreen';
import HomeScreen from './app/screens/HomeScreen';
import RecordScreen from './app/screens/RecordScreen';
import SaveScreen from './app/screens/SaveScreen';
import RunScreen from './app/screens/RunScreen';

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName='Splash'
        screenOptions={{
          headerShown: false,
          gestureEnabled: false
        }}
      >
        <Screen name='Splash' component={SplashScreen}></Screen>
        <Screen name='Home' component={HomeScreen}></Screen>
        <Screen name='Record' component={RecordScreen}></Screen>
        <Screen name='Save' component={SaveScreen}></Screen>
        <Screen name='Run' component={RunScreen}></Screen>
      </Navigator>
    </NavigationContainer>
  );
}
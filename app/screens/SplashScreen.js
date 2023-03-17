import { useEffect, } from 'react';
import { View, Text, Image } from 'react-native';

/**
 * Component for SplashScreen
 * 
 * @param {navigation} Navigation object
 * 
 * @return {Components} View of components
 */
export default function SplashScreen({ navigation }) {

    /**
    * Runs when component is mounted
    *
    * @return {undefined}
    */
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home');
        }, 1000);
    },[]);

    /**
    * Reders layout of screen
    */
    return(
        <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor:'rgb(59, 154, 226)'}}>
            <Text style={{fontSize: 50, color:'white', marginBottom:50}}>RunRunRun</Text>
            <Image source={require('../assets/splash.gif')}/>
        </View>
    )
}
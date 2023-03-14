import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';

export default function SplashScreen({ navigation }) {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home');
        }, 1500);
    },[]);

    return(
        <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor:'rgb(59, 154, 226)'}}>
            <Text style={{fontSize: 50, color:'white', marginBottom:50}}>RunRunRun</Text>
            <Image source={require('../assets/splash.gif')}/>
        </View>
    )
}
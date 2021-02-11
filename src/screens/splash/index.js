import React, {useEffect} from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Logo from './../../assets/Vector.png'
import SplashScreen from 'react-native-splash-screen';

const Splash = ({navigation}) => {
    useEffect(() => {
      setTimeout(() => {
        navigation.navigate('Tab')
      }, 5000);
    }, []);
    return(
        <View style={styles.container}>
            <Image source={Logo} />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        display : 'flex',
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Splash
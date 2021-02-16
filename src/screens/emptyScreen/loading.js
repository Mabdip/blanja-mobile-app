import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const EmpptyResult = () => {
    return (
        <>
            <View style={styles.container}>
                <Text style={{fontSize:18}}>LOADING...</Text>
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default EmpptyResult
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'
import React from 'react'

const TicketButton = ({ buttonIcon, buttonPress }) => {
    return (
        <TouchableHighlight
            onPress={buttonPress}
            underlayColor={'transparent'}
            activeOpacity={0.8} 
            style={styles.buttonContainer}
            >
            <Image source={buttonIcon} style={styles.buttonIcon} resizeMode='contain' />
        </TouchableHighlight>
    )
}

export default TicketButton

const styles = StyleSheet.create({
    buttonContainer:{
        width:'100%',
        alignItems:'center',
        marginTop:10,
    },
    buttonIcon:{
        width:'80%',
        height:121,
    },
    
})
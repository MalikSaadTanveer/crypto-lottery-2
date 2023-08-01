import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import fonts from '../utils/fonts'

const ButtonComponent = ({ onPress, text, width, color, backgroundColor, underlayColor }) => {
  return (
    <TouchableHighlight
      style={{...styles.buttonContainer,width: width || '80%',
        backgroundColor: backgroundColor || colors.light}}
      onPress={onPress}
      activeOpacity={0.4} underlayColor={underlayColor || colors.light}
    >
      <Text style={{...styles.buttonText,color: color || colors.dark,}} >{text}</Text>
    </TouchableHighlight>
  )
}

export default ButtonComponent

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 20,
    padding: 16,
    width: '80%',
    borderRadius: 100
  },
  buttonText: {
    
    textAlign: 'center',
    fontSize: 16,
    fontFamily: fonts.UbuntuBold,
    lineHeight: 18
  }
})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import fonts from '../utils/fonts'

const GuideStepBox = ({ step, title, desc }) => {
  return (
    <View style={styles.container} >
      <Text style={styles.steps} >{step}</Text>
      <Text style={styles.title} >{title}</Text>
      <Text style={styles.desc} >{desc}</Text>
    </View>
  )
}

export default GuideStepBox

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.modalPrimaryColor,
        paddingVertical:30,
        paddingHorizontal:16,
        borderRadius:18,
        marginBottom:20
    },
    steps:{
      color:colors.dark,
      fontSize:14,
      textTransform:'uppercase',
      fontFamily:fonts.UbuntuLight
    },
    title:{
      color:colors.secondary,
      marginTop:10,
      fontSize:18,
      fontFamily:fonts.UbuntuBold
    },
    desc:{
      color:colors.dark,
      marginTop:10,
      fontSize:14,
      fontFamily:fonts.UbuntuRegular,
      lineHeight:18
    }
})
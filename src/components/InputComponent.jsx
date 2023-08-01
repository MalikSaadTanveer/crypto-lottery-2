import { StyleSheet, Text, View, TextInput, Image } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import fonts from '../utils/fonts'

const InputComponent = ({ placeholder, icon, security, value, onChangeText,type }) => {
    return (
        <View style={styles.textInputContainer}>
            <Image source={icon} style={styles.icon}  resizeMode='contain'/>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                style={styles.textInput}
                placeholder={placeholder}
                placeholderTextColor={colors.light}
                selectionColor={colors.light}
                secureTextEntry={security || false}
                keyboardType={type}
            />

        </View>
    )
}

export default InputComponent

const styles = StyleSheet.create({
    textInputContainer: {
        width: '100%',
        zIndex: 1,
        position:'relative',
        marginBottom:20
    },
    icon:{
        width:20,
        height:20,
        position:'absolute',
        top:18,
        left:25
    },
    textInput: {
        backgroundColor: colors.inputBackground,
        borderRadius: 50,
        paddingVertical: 14,
        paddingLeft: 60,
        paddingRight: 10,
        fontSize: 16,
        fontFamily: fonts.UbuntuLight,
        color: colors.light
    },
})
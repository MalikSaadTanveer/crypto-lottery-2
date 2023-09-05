import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import React from 'react'
import fonts from '../utils/fonts'
import { colors } from '../utils/colors'
import backImage from '../../assets/icons/back.png'
const HeaderSimple = ({ centerTitle, leftTitle, onPress }) => {
    return (
        <View style={styles.container}>

            <TouchableHighlight onPress={onPress} style={styles.button} 
                activeOpacity={0.8} underlayColor="transparent"  >
                <View style={styles.leftContainer} >
                    <Image source={backImage} style={styles.backImage} resizeMode='contain' />
                    <Text style={styles.title} >{leftTitle}</Text>
                </View>
            </TouchableHighlight>

            {centerTitle &&
                <Text style={styles.title} >{centerTitle}</Text>}
        </View>
    )
}

export default HeaderSimple

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        position: 'relative'
    },
    button: {
        position: 'absolute',
        left: 20
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backImage: {
        width: 18,
        height: 18,
        marginRight: 10,
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.UbuntuRegular,
        color: colors.light,
    },

})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import fonts from '../utils/fonts'

const PrizeFundComp = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Prize Funds</Text>

            <Text style={styles.bodyText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>

            <Text style={styles.mainText}>Ticket Purchases</Text>
            <View style={styles.textContainer}>
                <Text style={styles.dot}>•</Text>
                <Text style={{ ...styles.bodyText, paddingTop: 0 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
            </View>

            <Text style={styles.mainText}>Rollover Prizes</Text>
            <View style={styles.textContainer}>
                <Text style={styles.dot}>•</Text>
                <Text style={{ ...styles.bodyText, paddingTop: 0 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
            </View>

            <Text style={styles.mainText}>CAKE Injections</Text>
            <View style={styles.textContainer}>
                <Text style={styles.dot}>•</Text>
                <Text style={{ ...styles.bodyText, paddingTop: 0 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
            </View>
        </View>
    )
}

export default PrizeFundComp

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    title: {
        color: colors.secondary,
        // marginTop: 10,
        // marginTop: 10,
        fontSize: 18,
        fontFamily: fonts.UbuntuBold
    },
    mainText: {
        color: colors.dark,
        paddingTop: 14,
        fontSize: 15.5,
        fontFamily: fonts.UbuntuRegular,
        lineHeight: 18
    },
    bodyText: {
        color: colors.darkOpacity,
        paddingTop: 10,
        fontSize: 14,
        fontFamily: fonts.UbuntuLight,
        lineHeight: 16
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 10,
    },
    dot: {
        color: colors.dark,
        marginRight: 10
    }
})
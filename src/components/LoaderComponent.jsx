import { StyleSheet, Text, View, Dimensions,ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors';


const height = Dimensions.get('screen').height;
const LoaderComponent = ({ loader }) => {
    return (
        <>
            {loader &&
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={'large'} color={colors.light} />
                </View>
            }
        </>
    )
}

export default LoaderComponent

const styles = StyleSheet.create({
    loadingContainer: {
        width: '100%',
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        top: 0,
        zIndex: 5
    },
})
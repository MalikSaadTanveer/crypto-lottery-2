import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import fonts from '../utils/fonts'
import { colors } from '../utils/colors'
import stars from '../../assets/images/stars.png'
const AmountComponent = ({ amount, currency }) => {
  return (
    <View style={styles.container} >
      <Text style={styles.title}>The Crypto Lottery</Text>
      <View style={styles.amountContainer} >
        <Text style={styles.currency}>{currency}</Text>
        <Text style={styles.amount}>${amount}</Text>
      </View>
      <Text style={styles.title}>in prizes!</Text>
      <Image source={stars} style={styles.stars} resizeMode='contain' />
    </View>
  )
}

export default AmountComponent

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.UbuntuRegular,
    color: colors.light
  },
  amountContainer: {
    position: 'relative',
  },
  currency: {
    fontSize: 10,
    backgroundColor: colors.currencyColor,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 10,
    color: colors.light,
    fontFamily: fonts.UbuntuRegular,
    position: 'absolute',
    right: -20,
    elevation: 10,
    top: -2
  },
  amount: {
    fontSize: 50,
    color: colors.light,
    marginVertical: 9,
    fontFamily: fonts.UbuntuBold
  },
  stars:{
    width:'100%',
    height:140,
    position:'absolute',
    top:20
  },
})
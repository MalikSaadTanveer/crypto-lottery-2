import { StyleSheet, Text, View, TouchableHighlight, ScrollView,ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import fonts from '../utils/fonts'

const LoaderLotteryStatus = () => {

  const data = [
    {
      matchType: 'Ticket #120',
      winningAmount: 'LOSS',
    },
    {
        matchType: 'Ticket #121',
        winningAmount: 'WIN',
    },
    {
        matchType: 'Ticket #122',
        winningAmount: 'WIN',
    },
    {
        matchType: 'Ticket #123',
        winningAmount: 'LOSS',
    },
    {
        matchType: 'Ticket #124',
        winningAmount: 'LOSS',
    },
  ]

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Tickets</Text>
          {/* <TouchableHighlight
            activeOpacity={0.1}
            underlayColor={'transparent'}
            style={styles.headerImageContainer}
          >
            <Text style={styles.headerDate} >#952 | Draw: Jul 7, 2023, 5:00 PM</Text>
          </TouchableHighlight> */}
            <ActivityIndicator style={styles.headerImageContainer} color={'grey'} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>

          {/* <Text style={styles.middleText}>Prize Pot</Text> */}
          <View style={styles.amountContainer}>
            {/* <Text style={styles.amount1}>#23, #24, ...</Text> */}
            <ActivityIndicator style={styles.amount1} color={colors.primary} size={'large'} />
            <Text style={styles.amount2}>Current Tickets</Text>
          </View>

          <View style={styles.mainContainer} >
            <Text style={styles.mainTitle}>Tickets History:</Text>

            <View style={styles.matchesContainer} >

              {
                data.length > 0 &&
                data.map((item, index) => (
                  <View style={{...styles.matchItem, width:index % 2 == 0 ? '60%':'30%'}} key={index}>
                    {/* <Text style={styles.matchType}>{item.matchType}</Text> */}
                    {/* <Text style={styles.winningAmount}>{item.winningAmount}</Text> */}
                    <Text style={styles.matchType}>Loading...</Text>
                    <ActivityIndicator style={styles.winningAmount} color={colors.primary} size={'large'} />

                  </View>
                ))
              }

            </View>

          </View>

        </ScrollView>
      </View>
    </View>
  )
}

export default LoaderLotteryStatus

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: '100%',
  },
  innerContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.light,
    borderRadius: 30,
    marginTop: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.modalPrimaryColor,
  },
  headerText: {
    color: colors.dark,
    fontSize: 16,
    fontFamily: fonts.UbuntuBold,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  headerImageContainer: {
    paddingRight: 20,
    paddingVertical: 16,
    width: '20%',

  },
  headerDate: {
    color: colors.dark,
    fontSize: 12,
    width: '100%',
    fontFamily: fonts.UbuntuRegular
  },

  middleText: {
    color: colors.dark,
    fontSize: 16,
    fontFamily: fonts.UbuntuBold,
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1
  },
  amountContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 24,
  },
  amount1: {
    color: colors.primary,
    fontSize: 24,
    fontFamily: fonts.UbuntuBold,
    lineHeight: 27,
    marginBottom: 4
  },
  amount2: {
    color: colors.dark,
    fontSize: 12.5,
    fontFamily: fonts.UbuntuLight,
    lineHeight: 14
  },
  mainContainer: {
    backgroundColor: colors.modalPrimaryColor,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  mainTitle: {
    color: colors.dark,
    fontSize: 12.5,
    fontFamily: fonts.UbuntuLight,
    lineHeight: 14,
  },
  matchesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    flexWrap: 'wrap'
  },
  matchItem: {
    // width:'50%',
    marginBottom: 22,
    alignItems:'flex-start'
  },
  matchType: {
    color: colors.secondary,
    fontSize: 14,
    fontFamily: fonts.UbuntuBold,

  },
  winningAmount: {
    color: colors.primary,
    fontSize: 24,
    fontFamily: fonts.UbuntuBold,
    marginVertical: 4,
    marginLeft:20
  },
  totalAmount: {
    color: colors.dark,
    fontSize: 12.5,
    fontFamily: fonts.UbuntuLight,

  }
})
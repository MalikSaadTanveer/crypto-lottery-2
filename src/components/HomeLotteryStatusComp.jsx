import { StyleSheet, Text, View, TouchableHighlight, ScrollView } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import fonts from '../utils/fonts'

const HomeLotteryStatusComp = ({ sessionId, endTime }) => {

  const data = [
    {
      matchType: 'Match first 1',
      winningAmount: 269,
      totalAmount: 412
    },
    {
      matchType: 'Match first 2',
      winningAmount: 403,
      totalAmount: 618,
    },
    {
      matchType: 'Match first 3',
      winningAmount: 671,
      totalAmount: 1031,
    },
    {
      matchType: 'Match first 4',
      winningAmount: 134,
      totalAmount: 2061,
    },
    {
      matchType: 'Match first 5',
      winningAmount: 268,
      totalAmount: 4122,
    },
    {
      matchType: 'Match all 6',
      winningAmount: 531,
      totalAmount: 8244,
    },
    {
      matchType: 'Burn',
      winningAmount: 2686,
      totalAmount: 4122,
    },
  ]

  function formatString(input) {
    if (input.length <= 6) {
      return input; // Return as is if the input is less than or equal to 6 characters
    }
  
    const prefix = input.slice(0, 3); // Extract the first 3 characters
    const suffix = input.slice(-3); // Extract the last 3 characters
    const ellipsis = '...'; // The ellipsis to be inserted between the prefix and suffix
  
    return prefix + ellipsis + suffix;
  }

  function convertToFormattedDate(inputTime) {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    const dateObj = new Date(inputTime);
    const month = months[dateObj.getUTCMonth()];
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    let hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    let meridiem = "AM";
    
    if (hours >= 12) {
      meridiem = "PM";
      if (hours > 12) {
        hours -= 12;
      }
    }
  
    return `${month} ${day}, ${year}, ${hours}:${minutes.toString().padStart(2, '0')} ${meridiem}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Next Draw</Text>
          <TouchableHighlight
            activeOpacity={0.1}
            underlayColor={'transparent'}
            style={styles.headerImageContainer}
          >
            <Text style={styles.headerDate} >#{sessionId ? formatString(sessionId) : "N/A" } | Draw: {endTime ? convertToFormattedDate(endTime) : 'N/A' } </Text>
          </TouchableHighlight>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>

          <Text style={styles.middleText}>Prize Pot</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.amount1}>~$20,609</Text>
            <Text style={styles.amount2}>13,428 USDT</Text>
          </View>

          <View style={styles.mainContainer} >
            <Text style={styles.mainTitle}>Match the winning number in the same order to share prizes. Current prizes up for grabs:</Text>

            <View style={styles.matchesContainer} >

              {
                data.length > 0 &&
                data.map((item, index) => (
                  <View style={styles.matchItem} key={index}>
                    <Text style={styles.matchType}>{item.matchType}</Text>
                    <Text style={styles.winningAmount}>{item.winningAmount} USDT</Text>
                    <Text style={styles.totalAmount}>~${item.totalAmount}</Text>
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

export default HomeLotteryStatusComp

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
    width: '50%',
    alignItems:'center'
  },
  headerDate: {
    color: colors.dark,
    fontSize: 12,
    width: '100%',
    fontFamily: fonts.UbuntuRegular,
    textAlign:'left'
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
    paddingVertical: 16,
  },
  amount1: {
    color: colors.primary,
    fontSize: 28,
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
    marginVertical: 4

  },
  totalAmount: {
    color: colors.dark,
    fontSize: 12.5,
    fontFamily: fonts.UbuntuLight,

  }
})
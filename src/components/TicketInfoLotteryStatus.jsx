import { StyleSheet, Text, View, TouchableHighlight, ScrollView } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import fonts from '../utils/fonts'

const TicketInfoLotteryStatus = ({userData, currentTickets, previousTickets, sessionId, endTime}) => {
  // console.log("userData",userData)
  // const data = [
  //   {
  //     matchType: 'Ticket #120',
  //     winningAmount: 'LOSS',
  //   },
  //   {
  //       matchType: 'Ticket #121',
  //       winningAmount: 'WIN',
  //   },
  //   {
  //       matchType: 'Ticket #122',
  //       winningAmount: 'WIN',
  //   },
  //   {
  //       matchType: 'Ticket #123',
  //       winningAmount: 'LOSS',
  //   },
  //   {
  //       matchType: 'Ticket #124',
  //       winningAmount: 'LOSS',
  //   },
  //   {
  //       matchType: 'Ticket #125',
  //       winningAmount: 'WIN',
  //   },
  //   {
  //       matchType: 'Ticket #126',
  //       winningAmount: 'WIN',
  //   },
  // ]

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
  
  // const inputTime = "2023-07-26T00:00:00.000+00:00";
  // const formattedDate = convertToFormattedDate(inputTime);
  // console.log(formattedDate); // Output: "Jul 26, 2023, 12:00 AM"
  

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Tickets</Text>
          <TouchableHighlight
            activeOpacity={0.1}
            underlayColor={'transparent'}
            style={styles.headerImageContainer}
          >
            <Text style={styles.headerDate} >#{formatString(sessionId)} | Draw: {convertToFormattedDate(endTime)}</Text>
          </TouchableHighlight>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>

          {/* <Text style={styles.middleText}>Prize Pot</Text> */}
          <View style={styles.amountContainer}>
            <Text style={styles.amount1} numberOfLines={1}>{ currentTickets?.length>0 ? currentTickets?.map((item) => `#${item?.ticket?.number} ` ) : "No Ticket Found" } </Text>
            <Text style={styles.amount2}>Current Tickets</Text>
          </View>

          <View style={styles.mainContainer} >
            <Text style={styles.mainTitle}>Tickets History:</Text>

            <View style={styles.matchesContainer} >

              {
                previousTickets?.length > 0 ?
                previousTickets?.map((item, index) => (
                  <View style={{...styles.matchItem, width:index % 2 == 0 ? '60%':'30%'}} key={index}>
                    <Text style={styles.matchType}>Ticket {item?.ticket?.number}</Text>
                    <Text style={styles.winningAmount}>{ item?.ticket?.status }</Text>
                  </View>
                ))
                :
                <Text style={styles.noRecordFound}>No Record Found...</Text>
              }

            </View>

          </View>

        </ScrollView>
      </View>
    </View>
  )
}

export default TicketInfoLotteryStatus

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
    textTransform:'uppercase'
  },
  totalAmount: {
    color: colors.dark,
    fontSize: 12.5,
    fontFamily: fonts.UbuntuLight,
  },
  noRecordFound:{
    width:'100%',
    textAlign:'center',
    color:colors.primary,
    marginVertical:10,
    fontFamily:fonts.UbuntuBold,
    fontSize:16
  }
})
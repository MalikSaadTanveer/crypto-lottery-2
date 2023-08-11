import { StyleSheet, Text, View, Button, TouchableHighlight, Image, Alert } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'

import { AuthContext } from '../../utils/context'
import ScreensLayout from '../../layouts/ScreensLayout';
import HeaderAvatar from '../../components/HeaderAvatar';
import avatar from '../../../assets/images/avatar.png'
import AmountComponent from '../../components/AmountComponent';
import TicketButton from '../../components/TicketButton';
import balanceTicket from '../../../assets/images/balanceTickets.png'
import { colors } from '../../utils/colors';
import fonts from '../../utils/fonts';
import ButtonComponent from '../../components/ButtonComponent';
import navigationString from '../../utils/navigationString';
import infoImage from '../../../assets/icons/info.png'
import nextImage from '../../../assets/icons/next.png'
import HeaderSimple from '../../components/HeaderSimple';
import TicketInfoLotteryStatus from '../../components/TicketInfoLotteryStatus';
import LoaderLotteryStatus from '../../components/LoaderLotteryStatus';
import axios from 'axios'
import { baseURL } from '../../utils/baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';


const TicketInfoScreen = ({ navigation }) => {
  const { signOut, setUserData, currentSession } = useContext(AuthContext)
  const [isModalVisible, setModalVisible] = useState(false);
  const [checkWinnigLoader,setCheckWinningLoader] = useState(false)

  const [loader, setLoader] = useState(false)
  const [data, setData] = useState(null)
  const [currentTickets, setCurrentTickets] = useState(null)
  const [previousTickets, setPreviousTickets] = useState(null)
  const [endTime, setEndTime] = useState('...')
  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused) {
      getDatafromApi()
    }
  }, [isFocused])


  const getDatafromApi = async () => {
    setLoader(true)
    setUserData(null)
    try {
      let userToken = await AsyncStorage.getItem('userToken');

      let result = await axios.get(`${baseURL}/api/user/${userToken}`)
     
      if (result.status == 200) {
        setData(result.data.user)
        setUserData(result.data.user)
        getUserPreviousAndCurrentTokens(result?.data?.user?._id, currentSession?._id)

      }
      else {
        Alert.alert("Error:", "Something went wrong",
          [{
            text: "Go Back",
            onPress: () => { navigation.goBack() }
          },
          {
            text: 'Refresh',
            onPress: () => { getDatafromApi() }
          }])

      }

    } catch (error) {
      Alert.alert("Error:", "Something went wrong",
        [{
          text: "Go Back",
          onPress: () => navigation.goBack()
        },
        {
          text: 'Refresh',
          onPress: () => { getDatafromApi() }
        }])
      
    }
  }

  const getUserPreviousAndCurrentTokens = async (userId, session) => {

    try {
      let result = await axios.get(`${baseURL}/api/user_ticket/get_current_and_previous_tickets/${session}/${userId}`,)

     
      if (result.status == 200) {
        
        setCurrentTickets(result?.data?.current_tickets)
        setPreviousTickets(result?.data?.previous_tickets)
        setLoader(false)
      }
      else {
        Alert.alert("Error:", "Something went wrong",
          [{
            text: "Go Back",
            onPress: () => { navigation.goBack() }
          },
          {
            text: 'Refresh',
            onPress: () => { getDatafromApi() }
          }])

      }

    } catch (error) {
      Alert.alert("Error:", "Something went wrong",
        [{
          text: "Go Back",
          onPress: () => navigation.goBack()
        },
        {
          text: 'Refresh',
          onPress: () => { getDatafromApi() }
        }])
      
    }



  }


  useEffect(() => {
    if (currentSession) {
      
      getLotteryEndTime(currentSession)
      setInterval(() => {
        getLotteryEndTime(currentSession)
      }, 60000)

    }
  }, [currentSession])

  const getLotteryEndTime = (currentSession) => {
    const currentTime = new Date();

    // Set the end time to July 29, 2023, at 20:00:00 UTC
    const endTime = new Date(currentSession?.end_date);

    // Calculate the time difference in milliseconds
    const timeDifference = endTime - currentTime;

    // Convert milliseconds to days, hours, and minutes
    const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    setEndTime(`${remainingDays}d ${remainingHours}h ${remainingMinutes}m`)
  }

  const handleLogout = () => {
    signOut()
  }

  const handleNavigation = () => {
    navigation.navigate(navigationString.ResultScreen)
  }

  const backPress = () => {
    navigation.goBack()
  }
  const goToGuideScreen = () => {
    navigation.navigate(navigationString.GuideScreen)
  }

  const checkWinnigTicket = async () =>{
    try {
      setCheckWinningLoader(true)
      let userToken = await AsyncStorage.getItem('userToken')
      let result = await axios.get(`${baseURL}/api/user_ticket/check_winning/${currentSession?._id}/${userToken}`)

      if(!result?.data?.error){
        setCheckWinningLoader(false)
        console.log("Result Data ", result?.data)
        navigation.navigate(navigationString.ResultScreen,{
          data: result?.data?.error_msg || result?.data?.success_msg
        })
      }
      else{
        Alert.alert("Error:", "Something went wrong",
        [{
          text: "Go Back",
        },])
        setCheckWinningLoader(false)
      }
      
    } catch (error) {
      setCheckWinningLoader(false)
      Alert.alert("Error:", "Something went wrong",
      [{
        text: "Go Back",
      },])
      
    }
  }

  return (
    <ScreensLayout loader={checkWinnigLoader} >
      <View style={styles.container}>
        <HeaderSimple
          centerTitle="Ticktets"
          leftTitle="Back"
          onPress={backPress}
        />

        <AmountComponent
          amount={currentSession?.total_reward?.['$numberDecimal']}
          currency="USDT"
        />

        <TicketButton
          buttonIcon={balanceTicket}
          buttonPress={() => { }}
        />

        <View style={styles.textsContainer}>
          <Text style={styles.text1}>Get your tickets now!</Text>
          <Text style={styles.text2}>
            <Text style={{ color: colors.golden }} >{endTime} </Text>until the draw</Text>
        </View>



        {data && currentTickets?.length >=0 && previousTickets?.length >=0  ?
          <>
            <TicketInfoLotteryStatus
              userData={data}
              currentTickets={currentTickets}
              previousTickets={previousTickets}
              sessionId={currentSession?._id}
              endTime={currentSession?.end_date}
            />
            <View style={styles.buttonContainer}>
              <ButtonComponent
                text="Check winning Tickets"
                width="100%"
                color={colors.secondary}
                onPress={checkWinnigTicket}
              />
            </View>
          </>
          :
          <LoaderLotteryStatus />
        }




        <TouchableHighlight style={styles.infoContainer} onPress={goToGuideScreen}
          activeOpacity={0.3} underlayColor={'transparent'}>
          <>
            <Image source={infoImage} style={styles.infoImage} resizeMode='contain' />
            <Text style={styles.infoText}>How to Play</Text>
            <Image source={nextImage} style={styles.nextImage} resizeMode='contain' />
          </>
        </TouchableHighlight>


      </View>


    </ScreensLayout>
  )
}

export default TicketInfoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    zIndex: 1,
  },
  textsContainer: {
    marginTop: 28,
    marginBottom: 20
  },
  text1: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.light,
    fontFamily: fonts.UbuntuBold,
    marginBottom: 8
  },
  text2: {
    textAlign: 'center',
    textAlign: 'center',
    fontSize: 16,
    color: colors.light,
    fontFamily: fonts.UbuntuRegular,
    marginBottom: 8
  },
  buttonContainer: {
    paddingHorizontal: 20
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    paddingTop: 10,
  },
  infoImage: {
    width: 20,
    height: 20
  },
  infoText: {
    paddingHorizontal: 10,
    color: colors.light,
    fontSize: 16,
    fontFamily: fonts.UbuntuRegular
  },
  nextImage: {
    width: 16,
    height: 16
  }
})
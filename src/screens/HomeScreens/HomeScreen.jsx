import { StyleSheet, Text, View, Button, TouchableHighlight, Image, Alert, Linking, BackHandler } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../utils/context'
import ScreensLayout from '../../layouts/ScreensLayout';
import HeaderAvatar from '../../components/HeaderAvatar';
import avatar from '../../../assets/images/avatar.png'
import AmountComponent from '../../components/AmountComponent';
import TicketButton from '../../components/TicketButton';
import buyTicket from '../../../assets/images/buyTickets.png'
import { colors } from '../../utils/colors';
import fonts from '../../utils/fonts';
import ButtonComponent from '../../components/ButtonComponent';
import navigationString from '../../utils/navigationString';
import ModalCoinbase from '../../components/ModalCoinbase';
import ModalBuyTicket from '../../components/ModalBuyTicket';
import infoImage from '../../../assets/icons/info.png'
import nextImage from '../../../assets/icons/next.png'
import HomeLotteryStatusComp from '../../components/HomeLotteryStatusComp';

import MetaMaskSDK from '@metamask/sdk';
import BackgroundTimer from 'react-native-background-timer';
import axios from 'axios';
import { baseURL } from '../../utils/baseURL';


 

const HomeScreen = ({ navigation }) => {
  const { signOut, account, setAccount, currentSession, setCurrentSession } = useContext(AuthContext)
  const [unsoldTickets,setUnsoldTickets] = useState(0)
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalBuyVisible, setModalBuyVisible] = useState(false);
  const [loader, setLoader] = useState(false)
  const [full_name, setFull_name] = useState('Loading...')
  const [endTime, setEndTime] = useState('...')
  const [ethereum, setEthereum] = useState(null)
  const [numberOfTickets, setNumberOfTickets] = useState('1')
  useEffect(() => {
    getEthreumSDK()
    getName()
    getCurrentSession()
  }, [])

  useEffect(() => {
    if (numberOfTickets == '') {
      setNumberOfTickets('1')
    }
  }, [numberOfTickets])

  const getEthreumSDK = () => {
    const sdk = new MetaMaskSDK({
      openDeeplink: link => {
        Linking.openURL(link);
      },
      timer: BackgroundTimer,
      dappMetadata: {
        name: 'Crypto_Lottery_App',
        url: 'https://mainnet.infura.io/v3/2ddacf7ad8c84db58157e98d8842999b',  
      },
    });

    setEthereum(sdk.getProvider())
  }

  const getName = async () => {
    let name = await AsyncStorage.getItem('full_name')

    setFull_name(name)
  }

  const getCurrentSession = async () => {
    try {
      const result = await axios.get(`${baseURL}/api/session/get_current_session`);

      if (result.status == 200) {
        setCurrentSession(result?.data?.session[0])
        setUnsoldTickets(result?.data?.unsoldTickets)
      }
      else {
        Alert.alert("Error:", "Something went wrong",
          [{
            text: "Ok",
          },
          ])

      }

    } catch (error) {
      Alert.alert("Error:", "Something went wrong",
        [{
          text: "Ok",
        },
        ])

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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLogout = () => {

    signOut()
  }

  const handleNavigation = () => {
    navigation.navigate(navigationString.TicketInfoScreen)
  }

  const goToGuideScreen = () => {
    navigation.navigate(navigationString.GuideScreen)
  }



  //Formula to convert hex to decimal -> parseInt('0x5AF3107A4000', 16)
  //Formula to convert decimal(1 equal to 18 zeros) to hex -> '0x'+(600000000000000).toString(16)
  const handleSendTransaction = async () => {
    
    if(unsoldTickets == 0){
      Alert.alert("Warning", `Sorry, no tickets are remaining, Please wait for the next round.`, [{ text: "ok" }])
      return
    }
    else if(unsoldTickets < numberOfTickets){
      Alert.alert("Warning", `We have only ${unsoldTickets} tickets remaining that you can buy...`, [{ text: "ok" }])
      return
    }

    setLoader(true)
    const to = '0xBb2Eb22F3Ba38A4552b9Abb14A55356896425591';
    const price = '0x' + (600000000000000 * parseInt(numberOfTickets)).toString(16)
    const transactionParameters = {
      to,
      from: account,
      value: price
    };

    try {
      const txHash = await ethereum.request(
        {
          method: "eth_sendTransaction",
          params: [transactionParameters],
        })

      if (txHash) {

        userTicketBuying()
      }
      else {
        Alert.alert("Error:", "Something went wrong in payment...", [{ text: "ok" }])
      }
    } catch (e) {
      setLoader(false)
      if (e?.code)
        Alert.alert("Error:", "Payment is rejected...", [{ text: "ok" }])
      else {
        Alert.alert("Error:", "Something went wrong...", [{ text: "ok" }])
      }

    }
  }

  const userTicketBuying = async () => {
    try {
      setLoader(true)
      let userToken = await AsyncStorage.getItem('userToken');
      let result01 = await axios.put(`${baseURL}/api/user/${userToken}`, {wallet_address:account})
      let result = await axios.post(`${baseURL}/api/user_ticket/create_user_ticket`, {
        "session": currentSession?._id,
        "user": userToken,
        ticketQty: parseInt(numberOfTickets)
      })
      if (!result?.data?.error) {
        setLoader(false)
        getCurrentSession()
        Alert.alert("Success:", "Payment confirm Successfully...", [{ text: "ok" }])
      }
      else {
        setLoader(false)
        Alert.alert("Error:", "Something went wrong...", [{ text: "ok" }])
      }

    } catch (error) {
      setModalBuyVisible(false)
      setLoader(false)
      Alert.alert("Error:", "Something went wrong...", [{ text: "ok" }])
    }
  }


  const walletConnect = async () => {
    setLoader(true)
    try {
      const result = await ethereum.request({ method: 'eth_requestAccounts' });

      setAccount(result?.[0]);
      setLoader(false)
      toggleModal()

      Alert.alert("Success:", "Wallet Connected Successfully...", [{ text: "ok" }])
    } catch (e) {
      setLoader(false);
      Alert.alert("Error:", "Something went wrong...", [{ text: "ok" }])

    }
  };

  return (
    <ScreensLayout>
      <View style={styles.container}>

        <HeaderAvatar
          avatar={avatar}
          name={full_name}
          handleLogout={handleLogout}
        />

        <AmountComponent
          amount={currentSession?.total_reward?.['$numberDecimal'] || 0}
          currency="USDT"
        />

        <TicketButton
          buttonIcon={buyTicket}
          buttonPress={() => account ? setModalBuyVisible(true)
            : toggleModal()}
        />

        <View style={styles.textsContainer}>
          <Text style={styles.text1}>Get your tickets now!</Text>
          <Text style={styles.text2}>
            <Text style={{ color: colors.golden }} >
              {endTime} </Text>until the draw</Text>
        </View>


        <HomeLotteryStatusComp
          sessionId={currentSession?._id}
          endTime={currentSession?.end_date}
        />


        <View style={styles.buttonContainer}>
          <ButtonComponent
            text="Go to Tickets"
            width="100%"
            color={colors.secondary}
            onPress={handleNavigation}
          />
        </View>

        <TouchableHighlight style={styles.infoContainer} onPress={goToGuideScreen}
          activeOpacity={0.3} underlayColor={'transparent'}
        >
          <>
            <Image source={infoImage} style={styles.infoImage} resizeMode='contain' />
            <Text style={styles.infoText}>How to Play</Text>
            <Image source={nextImage} style={styles.nextImage} resizeMode='contain' />
          </>
        </TouchableHighlight>
      </View>

      <ModalCoinbase
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        onPress={walletConnect}
        loader={loader}

      />
      <ModalBuyTicket
        isModalVisible={isModalBuyVisible}
        setModalVisible={setModalBuyVisible}
        handleSubmit={handleSendTransaction}
        setNumberOfTickets={setNumberOfTickets}
        numberOfTickets={numberOfTickets}
        loader={loader}
      />

    </ScreensLayout>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    zIndex: 1,
    position: 'relative'
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
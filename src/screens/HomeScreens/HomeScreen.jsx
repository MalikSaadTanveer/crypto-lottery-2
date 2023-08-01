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
// import Modal from "react-native-modal";
import ModalCoinbase from '../../components/ModalCoinbase';
import infoImage from '../../../assets/icons/info.png'
import nextImage from '../../../assets/icons/next.png'
import HomeLotteryStatusComp from '../../components/HomeLotteryStatusComp';

import MetaMaskSDK from '@metamask/sdk';
import BackgroundTimer from 'react-native-background-timer';
import axios from 'axios';
import { baseURL } from '../../utils/baseURL';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';




const HomeScreen = ({ navigation }) => {
  const { signOut, account, setAccount, currentSession, setCurrentSession } = useContext(AuthContext)
  const [isModalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false)
  const [full_name, setFull_name] = useState('Loading...')
  const [endTime, setEndTime] = useState('...')
  const [ethereum, setEthereum] = useState(null)
  useEffect(() => {
    getEthreumSDK()
    getName()
    getCurrentSession()
  }, [])

  const getEthreumSDK = () => {
    const sdk = new MetaMaskSDK({
      openDeeplink: link => {
        Linking.openURL(link);
      },
      timer: BackgroundTimer,
      dappMetadata: {
        name: 'Crypto_Lottery_App',
        url: 'https://goerli.infura.io/v3/2ddacf7ad8c84db58157e98d8842999b',  //very Important .. it must be correct.
      },
    });

    setEthereum(sdk.getProvider())
  }

  const getName = async () => {
    let name = await AsyncStorage.getItem('full_name')
    console.log("Name",name)
    setFull_name(name)
  }

  const getCurrentSession = async () => {
    try {
      const result = await axios.get(`${baseURL}/api/session/get_current_session`);
      // console.log(result.status)
      if (result.status == 200) {
        // console.log(result?.data?.session[0])
        setCurrentSession(result?.data?.session[0])
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
      console.log(error)
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

  // console.log(parseInt('0x5AF3107A4000', 16))
  // console.log('0x'+(600000000000000).toString(16))
  const handleSendTransaction = async () => {

    console.log("I am account", account, ethereum.selectedAddress)
    setLoader(true)
    const to = '0x0c53300F02c168e2137309AE5a64d0491CD0Cb50';
    const transactionParameters = {
      to,
      from: account,
      // value: '0x5AF3107A4000', //0.0001
      value: '0x221b262dd8000'
      
    };
   
    try {
      const txHash = await ethereum.request(
        {
          method: "eth_sendTransaction",
          params: [transactionParameters],
        })
      console.log("txHash", txHash)
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
      console.log(e);
    }
  }

  const userTicketBuying = async () => {
    try {
      setLoader(true)
      let userToken = await AsyncStorage.getItem('userToken');

      let result = await axios.post(`${baseURL}/api/user_ticket/create_user_ticket`, {
        "session": currentSession?._id,
        "user": userToken
      })

      if (!result?.data?.error) {
        setLoader(false)
        Alert.alert("Success:", "Payment confirm Successfully...", [{ text: "ok" }])
      }
      else {
        setLoader(false)
        Alert.alert("Error:", "Something went wrong...", [{ text: "ok" }])
      }

    } catch (error) {
      setLoader(false)
      Alert.alert("Error:", "Something went wrong...", [{ text: "ok" }])
    }
  }


  //https://stackoverflow.com/questions/76540520/why-does-metamask-sdk-for-react-native-doesnt-make-wallet-connection-persistent
  
  const walletConnect = async () => {
    setLoader(true)
    try {
      const result = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log('RESULT', result?.[0]);
      setAccount(result?.[0]);
      setLoader(false)
      toggleModal()
      
      Alert.alert("Success:", "Wallet Connected Successfully...", [{ text: "ok" }])
    } catch (e) {
      setLoader(false);
      Alert.alert("Error:", "Something went wrong...", [{ text: "ok" }])
      console.log('ERROR', e);
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
          buttonPress={account ? handleSendTransaction : toggleModal}
        />

        <View style={styles.textsContainer}>
          <Text style={styles.text1}>Get your tickets now!</Text>
          <Text style={styles.text2}>
            <Text style={{ color: colors.golden }} >
              {/* 1d 3h 13m  */}
              {endTime} </Text>until the draw</Text>
        </View>


        <HomeLotteryStatusComp 
          sessionId={currentSession?._id }
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
      {/* <Button title={"Logout"} onPress={handleLogout} /> */}

      <ModalCoinbase
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        onPress={walletConnect}
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
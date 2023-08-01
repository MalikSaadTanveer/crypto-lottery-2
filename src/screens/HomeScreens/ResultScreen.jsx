import { StyleSheet, Text, View, Button, TouchableHighlight, Image, } from 'react-native'
import React, { useContext, useState } from 'react'

import { AuthContext } from '../../utils/context'
import ScreensLayout from '../../layouts/ScreensLayout';
import HeaderAvatar from '../../components/HeaderAvatar';
import avatar from '../../../assets/images/avatar.png'
import AmountComponent from '../../components/AmountComponent';
import TicketButton from '../../components/TicketButton';
import buyTicket from '../../../assets/images/buyTickets.png'
import RedeemTicket from '../../../assets/images/RedeemWinnings.png'
import { colors } from '../../utils/colors';
import fonts from '../../utils/fonts';
import ButtonComponent from '../../components/ButtonComponent';
import navigationString from '../../utils/navigationString';
import infoImage from '../../../assets/icons/info.png'
import nextImage from '../../../assets/icons/next.png'
import HeaderSimple from '../../components/HeaderSimple';
import stars from '../../../assets/images/stars.png'
import winningImage from '../../../assets/images/winning.png'
import losingImage from '../../../assets/images/losing.png'
import ModalDetail from '../../components/ModalDetail';
import Toast from 'react-native-toast-message';
import axios from 'axios'
import { baseURL } from '../../utils/baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResultScreen = ({ navigation, route }) => {
  const { userData, account } = useContext(AuthContext)
  const [isModalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState(userData?.email);
  const [phone, setPhone] = useState(userData?.phone);
  const [loader, setLoader] = useState(false)
  const winningStatus = route?.params?.data

  const openModal = () => {
    setEmail(userData?.email)
    setPhone(userData?.phone)
    setModalVisible(!isModalVisible);
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
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

  const handleSubmit = () => {
    if (!email?.trim() || !email?.trim().includes('@')) {
      Toast.show({ type: "error", text1: "Error:", text2: "Please enter correct email address..." });
      return
    }
    else if (!phone?.trim() || phone?.trim().length < 10) {
      Toast.show({ type: "error", text1: "Error:", text2: "Please enter correct phone number..." });
      return
    }

    setLoader(true)
    if (email?.trim() != userData.email || phone?.trim() != userData?.phone) {
      updateUser(email, phone)
      return
    }

    requesReward()

  }

  const updateUser = async (email, phone) => {
    try {
      let userToken = await AsyncStorage.getItem('userToken');
      let result = await axios.put(`${baseURL}/api/user/${userToken}`, {
        email,
        phone
      })

      if (result.status == 200) {
        requesReward()
      }
      else {
        setLoader(false)
        Toast.show({ type: "error", text1: "Error:", text2: "Something went wrong in updating data..." });
      }

    } catch (error) {
      console.log(error)
      setLoader(false)
      Toast.show({ type: "error", text1: "Error:", text2: "Something went wrong in updating data..." });

    }
  }


  // ToDO:
  const requesReward = async () => {
    try {
      let userToken = await AsyncStorage.getItem('userToken');
      let result = await axios.put(`${baseURL}/api/user_ticket/request_reward/64bfd5145259eb63375e5465`)

      if (result.status == 200) {
        Toast.show({ type: "success", text1: "Success:", text2: "Reward requested successfully..." });
        toggleModal()
        setTimeout(() => {
          navigation.goBack()
        }, 2000)
        setLoader(false)
      }
      else {
        setLoader(false)
        Toast.show({ type: "error", text1: "Error:", text2: "Something went wrong in updating data..." });
      }

    } catch (error) {
      console.log(error)
      setLoader(false)
      Toast.show({ type: "error", text1: "Error:", text2: "Something went wrong in updating data..." });

    }
  }

  return (
    <ScreensLayout  >
      <HeaderSimple
        centerTitle="Winning Tickets"
        leftTitle="Back"
        onPress={backPress}
      />


      {
        winningStatus == "Hurray, You have won the lottery" ?
        // true ?
          <View style={styles.container}>
            <View style={styles.innerContainer} >
              <Text style={styles.title}>Winning Ticket</Text>
              <Image source={winningImage} style={styles.stars} resizeMode='contain' />
            </View>
            <Text style={styles.amount}>Ticket #23</Text>
            <TicketButton
              buttonIcon={RedeemTicket}
              buttonPress={openModal}
            />
          </View>

          :

          <View style={styles.container}>
            <View style={styles.innerContainer} >
              <Text style={styles.title}>No Tickets Won</Text>
              <Image source={winningImage} style={styles.stars} resizeMode='contain' />
            </View>
            <Text style={styles.amount}>Try Again</Text>
            <ButtonComponent
              text="Back"
              color={colors.secondary}
              onPress={backPress}
            />
          </View>
      }

      <ModalDetail
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        account={account}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        handleSubmit={handleSubmit}
        loader={loader}
      />
      <Toast position='top' />

    </ScreensLayout>
  )
}

export default ResultScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  innerContainer: {
    alignItems: 'center',
    marginVertical: 10,
    position: 'relative'
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
    marginBottom: 30,
    fontFamily: fonts.UbuntuBold
  },
  stars: {
    width: '70%',
    height: 140,
    position: 'absolute',
    bottom: -30,
    // backgroundColor:'red'
    // top:100
  },
})
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import ScreensLayout from '../../layouts/ScreensLayout'
import lotteryLogo from '../../../assets/images/lotteryLogo.png'
import InputComponent from '../../components/InputComponent'
// import usernameIcon from '../../../assets/icons/username.png'
// import phIcon from '../../../assets/icons/ph.png'
import emailIcon from '../../../assets/icons/email.png'
import passwordIcon from '../../../assets/icons/password.png'
import ButtonComponent from '../../components/ButtonComponent'
import fonts from '../../utils/fonts'
import { colors } from '../../utils/colors'
import navigationString from '../../utils/navigationString'
import { AuthContext } from '../../utils/context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { baseURL } from '../../utils/baseURL'
import Toast from 'react-native-toast-message'

const LoginScreen = ({ navigation }) => {
  const [loader,setLoader] = useState(false)

  const { signIn } = useContext(AuthContext)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleForgetPassword = () =>{
    navigation.navigate(navigationString.ForgetPasswordEmail)
  }

  const handleScreen = ()=>{
    navigation.navigate(navigationString.SignupScreen)
  }

  const handleLogin = async ()=>{
  
    if(!email || !email.includes('@')){
      Toast.show({ type: "error", text1: "Error:", text2: "Please add email correctly..."});
      return
    }
    else if(!password || password.length<8){
      Toast.show({ type: "error", text1: "Error:", text2: "Password should be 8 characters..."});
      return
    }
    
    setLoader(true)
    try {
      
      let result = await axios.post(`${baseURL}/api/user/login`,{
        email,
        password
      });

      if(result?.data?.error){
        setLoader(false)
        Toast.show({ type: "error", text1: "Error:", text2: result?.data?.error_msg});
        return
      }
      
      setLoader(false)
      signIn(result?.data?.response?._id,result?.data?.response?.full_name)
    
    } catch (error) {
      setLoader(false)
      Toast.show({ type: "error", text1: "Error:", text2: "Something went wrong..."});
    }


  }


  return (
    <ScreensLayout padding={20} loader={loader}>

      <View style={styles.container}>
        <View style={styles.left}>
          <Image source={lotteryLogo} style={styles.lotteryLogo} resizeMode='contain' />
        </View>
        <View style={styles.right}>
          <InputComponent
            placeholder="Enter Email"
            icon={emailIcon}
            value={email}
            onChangeText={setEmail}
            type="email-address"
          />
          <InputComponent
            placeholder="Password"
            icon={passwordIcon}
            security={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.forgetPasswordContainer} 
            onPress={handleForgetPassword}
          >
            <Text style={styles.forgetPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          <ButtonComponent
            text="Login"
            width="100%"
            onPress={handleLogin}
          />

          <View style={styles.bottom} >
            <Text style={{color:colors.light}}>Don’t have account?</Text>
            <TouchableOpacity style={styles.bottomButtonContainer}
              onPress={handleScreen}>
              <Text style={styles.bottomButton}>Sign Up</Text>
            </TouchableOpacity>
          </View>

        </View>
        <Toast position='top'  />

      </View>

    </ScreensLayout>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    zIndex: 1
  },
  lotteryLogo: {
    width: 255,
    height: 200,
    marginBottom: 50
  },
  right: {
    width: '100%',
    alignItems: 'center'
  },
  forgetPasswordContainer: {
    alignSelf: 'flex-end'
  },
  forgetPassword: {
    textAlign: 'right',
    width: '100%',
    fontFamily: fonts.UbuntuLight,
    color:colors.light
  },
  bottom:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:20
  },
  bottomButtonContainer: {
    padding:6,
  },
  bottomButton: {
    fontSize:14,
    fontFamily:fonts.UbuntuBold,
    color:colors.light
  }
})
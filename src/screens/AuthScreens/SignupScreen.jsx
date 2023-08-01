import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import ScreensLayout from '../../layouts/ScreensLayout'
import lotteryLogo from '../../../assets/images/lotteryLogo.png'
import InputComponent from '../../components/InputComponent'
import usernameIcon from '../../../assets/icons/username.png'
import phIcon from '../../../assets/icons/ph.png'
import emailIcon from '../../../assets/icons/email.png'
import passwordIcon from '../../../assets/icons/password.png'
import ButtonComponent from '../../components/ButtonComponent'
import fonts from '../../utils/fonts'
import { colors } from '../../utils/colors'
import navigationString from '../../utils/navigationString'
import Toast from 'react-native-toast-message'
import axios from 'axios'
import { baseURL } from '../../utils/baseURL'
import LoaderComponent from '../../components/LoaderComponent'
import { AuthContext } from '../../utils/context'

const SignupScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext)

  const [loader,setLoader] = useState(false)

  const [full_name, setFull_name] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')

  const handleScreen = () => {
    navigation.navigate(navigationString.LoginScreen)
  }

  const handleSignUp = async ()=>{
    
    if(full_name.trim() == '' || full_name.trim().length < 4){
      Toast.show({ type: "error", text1: "Error:", text2: "Please add username correctly..."});
      return
    }
    else if(!phone || phone.length<10){
      Toast.show({ type: "error", text1: "Error:", text2: "Please add phone number correctly..."});
      return;
    }
    else if(!email || !email.includes('@')){
      Toast.show({ type: "error", text1: "Error:", text2: "Please add email correctly..."});
      return
    }
    else if(!password || password.length<8){
      Toast.show({ type: "error", text1: "Error:", text2: "Password should be 8 characters..."});
      return
    }
    else if(!cpassword || cpassword.length<8){
      Toast.show({ type: "error", text1: "Error:", text2: "Confirm password should be 8 characters..."});
      return
    }
    else if(password != cpassword){
      Toast.show({ type: "error", text1: "Error:", text2: "Passwords are not matching..."});
      return
    }

    setLoader(true)
    try {
      
      let result = await axios.post(`${baseURL}/api/user/signup`,{
        full_name,
        phone,
        email,
        password
      });

      if(result.data.error){
        setLoader(false)
        Toast.show({ type: "error", text1: "Error:", text2: "Something went wrong..."});
        return
      }
      
      setLoader(false)
      signIn(result?.data?.response._id,result?.data?.response?.full_name)
    
    } catch (error) {
      setLoader(false)
      Toast.show({ type: "error", text1: "Error:", text2: "Something went wrong..."});
    }


  }




  return (
    <ScreensLayout padding={20} loader={loader}>

      <View style={styles.container}>
        
        <View style={styles.left}>
          <Image source ={lotteryLogo} style={styles.lotteryLogo} resizeMode='contain' />
        </View>
        <View style={styles.right}>
          <InputComponent
            placeholder="User Name"
            icon={usernameIcon}
            value={full_name}
            onChangeText={setFull_name}
          />
          <InputComponent
            placeholder="Phone Number"
            icon={phIcon}
            value={phone}
            onChangeText={setPhone}
            type="phone-pad"
          />
          <InputComponent
            placeholder="Email Address"
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
          <InputComponent
            placeholder="Confirm Password"
            icon={passwordIcon}
            security={true}
            value={cpassword}
            onChangeText={setCPassword}
          />

          {/* <TouchableOpacity style={styles.forgetPasswordContainer}>
            <Text style={styles.forgetPassword}>Forgot Password?</Text>
          </TouchableOpacity> */}
          <ButtonComponent
            text="Sign Up"
            width="100%"
            onPress={handleSignUp}
          />

          <View style={styles.bottom} >
            <Text>Don’t have account?</Text>
            <TouchableOpacity style={styles.bottomButtonContainer}
              onPress={handleScreen}>
              <Text style={styles.bottomButton}>Login</Text>
            </TouchableOpacity>
          </View>

        </View>

      <Toast position='top'  />
      </View>
    </ScreensLayout>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    zIndex: 1,
    position:'relative'
  },
  lotteryLogo: {
    width: 205,
    height: 163,
    marginVertical: 50
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
    color: colors.light
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  bottomButtonContainer: {
    padding: 6,
  },
  bottomButton: {
    fontSize: 14,
    fontFamily: fonts.UbuntuBold,
    color: colors.light
  }
})
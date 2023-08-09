import React from 'react';

import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import navigationString from '../utils/navigationString';

import {
    SplashScreen,
    LoginScreen,
    SignupScreen,
    ForgetPasswordEmail,
    ForgetPasswordOTP,
    NewPasswords
} from '../screens'

const RootStack = createNativeStackNavigator ();

const RootStackScreen = () => (
    <RootStack.Navigator screenOptions={{headerShown:false,}}  >
        <RootStack.Screen name={navigationString.SplashScreen} component={SplashScreen}/>
        <RootStack.Screen name={navigationString.LoginScreen} component={LoginScreen}/>
        <RootStack.Screen name={navigationString.ForgetPasswordEmail} component={ForgetPasswordEmail}/>
        <RootStack.Screen name={navigationString.ForgetPasswordOTP} component={ForgetPasswordOTP}/>
        <RootStack.Screen name={navigationString.NewPasswords} component={NewPasswords}/>
        <RootStack.Screen name={navigationString.SignupScreen} component={SignupScreen}/>
            
    </RootStack.Navigator>
);

export default RootStackScreen;
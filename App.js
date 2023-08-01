import {StyleSheet,Linking} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './src/utils/context';
import RootStackScreen from './src/navigations/RootStackScreens';
import HomeStackScreen from './src/navigations/HomeStackScreens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './src/screens/AuthScreens/LoadingScreen';
import { MenuProvider } from 'react-native-popup-menu';

// MetaMask
// import MetaMaskSDK from '@metamask/sdk';
// import {ethers} from 'ethers';
// import BackgroundTimer from 'react-native-background-timer';
  // const sdk = new MetaMaskSDK({
  //   openDeeplink: link => {
  //     Linking.openURL(link);
  //   },
  //   timer: BackgroundTimer,
  //   dappMetadata: {
  //     name: 'Crypto_Lottery_App',
  //     url: 'https://goerli.infura.io/v3/2ddacf7ad8c84db58157e98d8842999b',  //very Important .. it must be correct.
  //   },
  // });
  
  // const ethereum = sdk.getProvider();

const App = () => {

  const [account, setAccount] = useState('');
  const [userData,setUserData] = useState(null)
  const [currentSession,setCurrentSession] = useState(null)
  
  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = useMemo(
    () => ({
      signIn: async (token,full_name) => {
        const userToken = String(token);
        try {
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('full_name', full_name);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGIN', token: userToken});
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('full_name');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      account,
      setAccount,
      userData,
      setUserData,
      currentSession,
      setCurrentSession
    }),
    [account,setAccount,userData,setUserData,currentSession,setCurrentSession],
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <MenuProvider>
            <HomeStackScreen />
          </MenuProvider>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({

});

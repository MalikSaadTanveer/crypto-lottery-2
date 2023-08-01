import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Keyboard
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { colors } from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import pageBottomImage from '../../assets/images/pageBottom.png';
import LoaderComponent from '../components/LoaderComponent';

const ScreensLayout = ({ children, padding, loader, scrollEnabled = true }) => {
  const [keyboardOpenStatus, setKeyboardOpenStatus] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        keyboardOpen()
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Keyboard.dismiss();
        keyboardClose()
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const keyboardOpen = () => {
    setKeyboardOpenStatus(true)
  }
  const keyboardClose = () => {
    setKeyboardOpenStatus(false)
  }


  return (
    <View style={styles.main}>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <SafeAreaView style={{ ...styles.main, }}>
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          style={styles.container}>
          
          <LoaderComponent loader={loader}/>
          
          {scrollEnabled ?
            <ScrollView
              keyboardShouldPersistTaps={'handled'}
              bounces={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ ...styles.innerContainer, paddingHorizontal: padding ? padding : undefined }}
              style={{ width: '100%', zIndex: 2 }}
            >
              {children}
              {
                !keyboardOpenStatus &&
                <Image source={pageBottomImage} style={styles.pageBottomImage} />
              }
            </ScrollView>
            :

            <View
              keyboardShouldPersistTaps={'handled'}
              bounces={false}
              showsVerticalScrollIndicator={false}
              style={{ width: '100%', zIndex: 2, ...styles.innerContainer, paddingHorizontal: padding ? padding : undefined }}
            >
              {children}
            </View>
          }


        </LinearGradient>
      </SafeAreaView>
    </View>
  );
};

export default ScreensLayout;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    width: '100%'
  },
  innerContainer: {
    flexGrow: 1,
    width: '100%'
  },
  SplashImage: {
    height: 392,
    backgroundColor: 'red',
  },
  pageBottomImage: {
    width: 220,
    height: 260,
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 0
  },
});

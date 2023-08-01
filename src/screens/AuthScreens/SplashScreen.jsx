import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import SplashImage from '../../../assets/images/splashImage.png';
import ScreensLayout from '../../layouts/ScreensLayout';
import fonts from '../../utils/fonts';
import ButtonComponent from '../../components/ButtonComponent';
import navigationString from '../../utils/navigationString';

const SplashScreen = ({ navigation }) => {

  const handleOnPress = () => {
    navigation.navigate(navigationString.LoginScreen)
  }
  return (
    <ScreensLayout>
      <View style={styles.container}>
        <Image
          source={SplashImage}
          style={styles.SplashImage}
          resizeMode="cover"
        />

        <Text style={styles.title} >Buy And Trade Top Cryto Lottery</Text>
        <Text style={styles.desc} >You can trade buy and sell Crypto Lottery here very easily and reliably</Text>
        <ButtonComponent onPress={handleOnPress} text="Get Started" />
      </View>
    </ScreensLayout>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  SplashImage: {
    height: 420,
    marginBottom: 20,
    width: '100%',
  },
  title: {
    textAlign: 'center',
    color: colors.light,
    fontSize: 24,
    width: '80%',
    marginBottom: 20,
    fontFamily: fonts.UbuntuBold,
    lineHeight: 29.87,
  },
  desc: {
    textAlign: 'center',
    color: colors.light,
    fontSize: 14,
    width: '80%',
    marginBottom: 20,
    fontFamily: fonts.UbuntuRegular,
    lineHeight: 16,
  },
});

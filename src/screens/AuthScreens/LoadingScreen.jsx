import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import pageBottomImage from '../../../assets/images/pageBottom.png';
const LoadingScreen = () => {
  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.activityIndicatorContainer}>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <ActivityIndicator size={'large'} color={colors.light} />
      <Image source={pageBottomImage} style={styles.pageBottomImage} />
    </LinearGradient>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position:'relative'
  },
  pageBottomImage:{
    width: 220,
    height: 260,
    position:'absolute',
    bottom:0,
    right:0
  }
});

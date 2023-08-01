import { StyleSheet, Text, View, TouchableHighlight, Image, ScrollView } from 'react-native'
import React from 'react'
import ScreensLayout from '../../layouts/ScreensLayout'
import HeaderSimple from '../../components/HeaderSimple'
import cross from '../../../assets/icons/cross.png'
import { colors } from '../../utils/colors'
import fonts from '../../utils/fonts'
import GuideStepBox from '../../components/GuideStepBox'
import WinningCriteria from '../../components/WinningCriteria'
import PrizeFundComp from '../../components/PrizeFundComp'
const GuideScreen = ({ navigation }) => {

  const goBack = () => {
    navigation.goBack()
  }
  return (
    <ScreensLayout scrollEnabled={false}>
      <View style={styles.container}>
        <HeaderSimple
          leftTitle="How to Play"
          onPress={goBack}
        />

        <View style={styles.innerContainer}>

          <View style={styles.header}>
            <Text style={styles.headerText}>How to Play</Text>
            <TouchableHighlight
              activeOpacity={0.1}
              underlayColor={'transparent'}
              style={styles.headerImageContainer}
              onPress={goBack}
            >
              <Image source={cross} style={styles.headerImage} resizeMode='contain' />
            </TouchableHighlight>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContainer}>

            <Text style={styles.bodyText} >
              Start by connecting with one of the wallets below.
              Be sure to store your private keys or seed phrase
              securely. Never share them with anyone.
            </Text>


            <View style={{ marginBottom: 10, }}>
              <GuideStepBox
                step="Step 1"
                title="Buy Tickets"
                desc="Lorem ipsum dolor sit amet consectetur. Sed morbi aliquam consequat luctus dolor pulvinar."
              />
              <GuideStepBox
                step="Step 2"
                title="Wait for the Draw"
                desc="Lorem ipsum dolor sit amet consectetur. Commodo malesuada eget facilisi praesent rhoncus amet."
              />
              <GuideStepBox
                step="Step 3"
                title="Check for Prizes"
                desc="Lorem ipsum dolor sit amet consectetur. Sed morbi aliquam consequat luctus dolor pulvinar."
              />
            </View>
            <View style={styles.hr} />

            <WinningCriteria />

            <View style={styles.hr} />

            <PrizeFundComp />

            <View style={styles.hr} />


            <View style={styles.footer} >
              <Text style={styles.footerTitle}>Still got questions?</Text>
              <Text style={styles.footerDesc}>Check our in-depth guide on how to play the <Text style={{fontFamily:fonts.UbuntuBold}} >CRYPTO LOTTERY! </Text></Text>
            </View>

          </ScrollView>
        </View>

      </View>
    </ScreensLayout>
  )
}

export default GuideScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    zIndex: 1,
  },
  innerContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.light,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.modalPrimaryColor,
  },
  headerText: {
    color: colors.dark,
    fontSize: 16,
    fontFamily: fonts.UbuntuBold,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerImageContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerImage: {
    width: 24,
    height: 24,

  },
  bodyText: {
    color: colors.dark,
    paddingVertical: 16,
    fontSize: 14,
    fontFamily: fonts.UbuntuLight
  },
  scrollContainer: {
    paddingHorizontal: 20,
    flexGrow: 1
  },
  hr: {
    borderTopColor: colors.borders,
    borderTopWidth: 1,
  },
  footer:{
    marginTop:40,
    marginBottom:20,
    width:'100%',
    alignItems:'center',
    paddingHorizontal:'12%'
  },
  footerTitle:{
    color:colors.secondary,
    fontSize:16,
    fontFamily:fonts.UbuntuBold,
    marginBottom:6,
  },
  footerDesc:{
    color:colors.dark,
    textAlign:'center',
    lineHeight:20,
    fontSize:14,
    fontFamily:fonts.UbuntuRegular
  }
})
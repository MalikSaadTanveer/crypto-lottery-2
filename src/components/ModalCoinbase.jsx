import { StyleSheet, Text, View, Dimensions, TouchableHighlight, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { colors } from '../utils/colors'
import cross from '../../assets/icons/cross.png'
import fonts from '../utils/fonts'
import metaMaskImage from '../../assets/images/metamask.png'
import ButtonComponent from './ButtonComponent'
import LoaderComponent from './LoaderComponent'


const screenHeight = Dimensions.get('screen').height
const ModalCoinbase = ({ isModalVisible, setModalVisible, onPress, loader }) => {


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }
    return (
        <Modal isVisible={isModalVisible}
            statusBarTranslucent={true}
            deviceHeight={screenHeight}
            animationInTiming={500}
            animationOutTiming={1000}
            backdropOpacity={0.6}
            style={styles.modalStyle}
        >

            <LoaderComponent loader={loader}/>

            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.headerText}>Connect Wallet</Text>
                    <TouchableHighlight
                        activeOpacity={0.1}
                        underlayColor={'transparent'}
                        style={styles.headerImageContainer}
                        onPress={toggleModal}
                    >
                        <Image source={cross} style={styles.headerImage} resizeMode='contain' />
                    </TouchableHighlight>
                </View>

                <Text style={styles.bodyText} >
                    Start by connecting with one of the wallets below.
                    Be sure to store your private keys or seed phrase
                    securely. Never share them with anyone.
                </Text>

                <View style={styles.coinbaseContainer} >
                    <Image source={metaMaskImage} style={styles.coinbaseImage} resizeMode='contain' />
                    <Text style={styles.coinbaseText}>MetaMask Wallet</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <ButtonComponent
                        text="Connect Wallet"
                        color={colors.light}
                        width='100%'
                        backgroundColor={colors.primary}
                        onPress={onPress}
                        underlayColor={colors.primary}
                    />
                </View>

            </View>
        </Modal>
    )
}

export default ModalCoinbase

const styles = StyleSheet.create({

    modalStyle: {
        margin: 0,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 2,
        position: 'relative',
    },
   
    container: {
        width: '100%',
        height: 380,
        backgroundColor: colors.light,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
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
        paddingHorizontal: 20,
        fontSize: 14,
        fontFamily: fonts.UbuntuLight
    },
    coinbaseContainer: {
        width: '100%',
        alignItems: 'center'
    },
    coinbaseImage: {
        width: 120,
        height: 120,
    },
    coinbaseText: {
        marginTop: 10,
        marginTop: 10,
        color: colors.dark,
        fontSize: 14,
        fontFamily: fonts.UbuntuLight
    },
    buttonContainer: {
        paddingHorizontal: 20,

    }

})
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, Image, TextInput, ScrollView } from 'react-native'
import React, { useState, useRef } from 'react'
import Modal from 'react-native-modal'
import { colors } from '../utils/colors'
import cross from '../../assets/icons/cross.png'
import fonts from '../utils/fonts'
import coinbaseImage from '../../assets/images/coinbase.png'
import ButtonComponent from './ButtonComponent'
import emailImage from '../../assets/icons/email2.png'
import ph from '../../assets/icons/ph2.png'
import id from '../../assets/icons/id.png'
import edit from '../../assets/icons/edit.png'
import LoaderComponent from './LoaderComponent'


const screenHeight = Dimensions.get('screen').height
const ModalDetail = ({ isModalVisible, setModalVisible, account, email, setEmail, phone, setPhone, handleSubmit, loader }) => {
    const [emailEnabled, setEmailEnabled] = useState(false)
    const [phEnabled, setPhEnabled] = useState(false)
    const [addrEnabled, setaddrEnabled] = useState(false)
    const emailRef = useRef(null)
    const phRef = useRef(null)
    const addrRef = useRef(null)
    const scrollViewRef = useRef(null)

    const handleEmailEditable = () => {

        emailRef.current.focus()
        // if(emailEnabled){
        //     emailRef.current.blur()
        // }
        // else{
        //     emailRef.current.focus()
        // }
        // setEmailEnabled(!emailEnabled)
    }

    const handlePhEditable = () => {
        phRef.current.focus()
        // if(phEnabled){
        //     phRef.current.blur()
        // }
        // else{
        //     phRef.current.focus()
        // }
        // setPhEnabled(!phEnabled)
    }

    const handleAddrEditable = () => {
        addrRef.current.focus()
        // if(addrEnabled){
        //     addrRef.current.blur()
        // }
        // else{
        //     addrRef.current.focus()
        // }
        // setaddrEnabled(!addrEnabled)
    }

    const handleScrollTo = p => {
        if (this.scrollViewRef.current) {
            this.scrollViewRef.current.scrollTo(p);
        }
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }


    return (
        <Modal isVisible={isModalVisible}
            statusBarTranslucent={true}
            deviceHeight={screenHeight}
            animationInTiming={500}
            animationOutTiming={300}
            backdropOpacity={0.6}
            style={styles.modalStyle}
            scrollTo={handleScrollTo}
        >
            <LoaderComponent loader={loader} />
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center',paddingHorizontal: 20, }}
                ref={scrollViewRef}
            >
                <View style={styles.container}>

                    <View style={styles.header}>
                        <Text style={styles.headerText}>Details</Text>
                        <TouchableHighlight
                            activeOpacity={0.1}
                            underlayColor={'transparent'}
                            style={styles.headerImageContainer}
                            onPress={toggleModal}
                        >
                            <Image source={cross} style={styles.headerImage} resizeMode='contain' />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.itemContainer} >
                        <View style={styles.leftIconContainer}>
                            <Image source={emailImage} style={styles.leftIcon} resizeMode='contain' />
                        </View>
                        <View style={styles.itemInner}>
                            <View style={{ width: '80%' }} >
                                <Text style={styles.itemTitle}>Email Address</Text>
                                <TextInput
                                    ref={emailRef}
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder='testing123@gmail.com'
                                    placeholderTextColor={'grey'}
                                    style={styles.itemTextInput}
                                    cursorColor={colors.dark}
                                    keyboardType='email-address'
                                // editable={emailEnabled}
                                />
                            </View>
                            <TouchableHighlight onPress={handleEmailEditable} activeOpacity={0.6} underlayColor={'transparent'}
                                style={styles.leftIconContainer}>
                                <Image source={edit} style={styles.leftIcon} resizeMode='contain' />
                            </TouchableHighlight>
                        </View>
                    </View>

                    <View style={styles.itemContainer} >
                        <View style={styles.leftIconContainer}>
                            <Image source={ph} style={styles.leftIcon} resizeMode='contain' />
                        </View>
                        <View style={styles.itemInner}>
                            <View style={{ width: '80%' }} >
                                <Text style={styles.itemTitle}>Phone</Text>
                                <TextInput
                                    ref={phRef}
                                    value={phone}
                                    onChangeText={setPhone}
                                    placeholder='0569373845'
                                    placeholderTextColor={'grey'}
                                    style={styles.itemTextInput}
                                    cursorColor={colors.dark}
                                    keyboardType='phone-pad'
                                // editable={phEnabled}
                                />
                            </View>
                            <TouchableHighlight onPress={handlePhEditable} activeOpacity={0.6} underlayColor={'transparent'}
                                style={styles.leftIconContainer}>
                                <Image source={edit} style={styles.leftIcon} resizeMode='contain' />
                            </TouchableHighlight>
                        </View>
                    </View>

                    <View style={styles.itemContainer} >
                        <View style={styles.leftIconContainer}>
                            <Image source={id} style={styles.leftIcon} resizeMode='contain' />
                        </View>
                        <View style={styles.itemInner}>
                            <View style={{ width: '80%' }} >
                                <Text style={styles.itemTitle}>ID Address</Text>
                                <TextInput
                                    ref={addrRef}
                                    value={account}
                                    placeholder='0x23...'
                                    placeholderTextColor={colors.dark}
                                    style={styles.itemTextInput}
                                    cursorColor={colors.dark}
                                    editable={false}
                                // editable={addrEnabled}
                                />
                            </View>
                            {/* <TouchableHighlight onPress={handleAddrEditable} activeOpacity={0.6} underlayColor={'transparent'}
                            style={styles.leftIconContainer}>
                            <Image source={edit} style={styles.leftIcon} resizeMode='contain' />
                        </TouchableHighlight> */}
                        </View>
                    </View>



                    <View style={styles.buttonContainer}>
                        <ButtonComponent
                            text="Submit"
                            color={colors.light}
                            width='100%'
                            backgroundColor={colors.primary}
                            onPress={handleSubmit}
                            underlayColor={colors.primary}
                        />
                    </View>

                </View>
            </ScrollView>
        </Modal>
    )
}

export default ModalDetail

const styles = StyleSheet.create({

    modalStyle: {
        margin: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 2,
        
        position: 'relative'
    },
    container: {
        width: '100%',
        height: 410,
        backgroundColor: colors.light,
        borderRadius: 30,
        
        position: 'relative'
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
    itemContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 20

    },
    leftIconContainer: {
        width: '10%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 16,
    },
    leftIcon: {
        width: 20,
        height: 20
    },
    rightIcon: {

    },
    itemInner: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        paddingBottom: 10,
        borderBottomColor: colors.borders,
        borderBottomWidth: 1,

    },
    itemTitle: {
        color: colors.dark,
        fontSize: 12,
        fontFamily: fonts.UbuntuLight
    },
    itemTextInput: {
        paddingBottom: 10,
        paddingHorizontal: 0,
        paddingTop: 4,
        color: colors.dark,
        fontSize: 16,
        fontFamily: fonts.UbuntuRegular
    },
    buttonContainer: {
        paddingHorizontal: 20,
    }

})
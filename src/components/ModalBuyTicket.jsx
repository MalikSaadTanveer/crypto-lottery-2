import { StyleSheet, Text, View, Dimensions, TouchableHighlight,TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
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
const ModalBuyTicket = ({ isModalVisible, setModalVisible, setNumberOfTickets, numberOfTickets, handleSubmit, loader }) => {

    
    const emailRef = useRef(null)
    const phRef = useRef(null)
    const addrRef = useRef(null)
    const scrollViewRef = useRef(null)


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
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20, }}
                ref={scrollViewRef}
            >
                <View style={styles.container}>

                    <View style={styles.header}>
                        <Text style={styles.headerText}>Buy Tickets</Text>
                        <TouchableHighlight
                            activeOpacity={0.1}
                            underlayColor={'transparent'}
                            style={styles.headerImageContainer}
                            onPress={toggleModal}
                        >
                            <Image source={cross} style={styles.headerImage} resizeMode='contain' />
                        </TouchableHighlight>
                    </View>



                    <View style={styles.additionalButtonsContainer}>
                        <TouchableOpacity style={styles.additionalButton} onPress={()=>setNumberOfTickets('2')}>
                            <Text style={styles.additionalButtonText}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.additionalButton} onPress={()=>setNumberOfTickets('4')}>
                            <Text style={styles.additionalButtonText}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.additionalButton} onPress={()=>setNumberOfTickets('6')}>
                            <Text style={styles.additionalButtonText}>6</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.additionalButton} onPress={()=>setNumberOfTickets('8')}>
                            <Text style={styles.additionalButtonText}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.additionalButton} onPress={()=>setNumberOfTickets('10')}>
                            <Text style={styles.additionalButtonText}>10</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Text Input */}
                    <TextInput
                        style={styles.textInput}
                        placeholder="Number of tickets you want to buy"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                        value={numberOfTickets}
                        maxLength={2}
                        onChangeText={(text)=>{setNumberOfTickets(text)}}
                    />





                    <View style={styles.buttonContainer}>
                        <ButtonComponent
                            text="Buy Tickets"
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

export default ModalBuyTicket

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
        height: 340,
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
    additionalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
        paddingHorizontal: 10, // Added paddingHorizontal
    },
    additionalButton: {
        backgroundColor: 'rgba(95, 95, 243, 1)', // Light blue color
        width:60,
        height:60,
        borderRadius: 50, // Circular buttons
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
    },
    additionalButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },

    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 20,
        color: '#333',
        backgroundColor:'rgba(0, 0, 0, 0.04)',
        paddingHorizontal: 20, // Added paddingHorizontal
    },
    buttonContainer: {
        paddingHorizontal: 20,
    }

})
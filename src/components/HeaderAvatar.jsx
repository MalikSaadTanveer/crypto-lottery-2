import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import React from 'react'
import fonts from '../utils/fonts'
import { colors } from '../utils/colors'
import notificationImage from '../../assets/icons/notification.png'

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
const HeaderAvatar = ({ avatar, name, handleLogout }) => {
    return (
        <View style={styles.container}>
            <Menu style={styles.menu}>
                <MenuTrigger >
                    <View style={styles.left}>
                        <Image source={avatar} style={styles.avatar} resizeMode='contain' />

                    </View>
                </MenuTrigger>
                <MenuOptions style={styles.menuOptions}>
                    <MenuOption  onSelect={() => handleLogout()}  >
                        <Text style={styles.singleMenuOption}>LOG OUT</Text>
                    </MenuOption>
                </MenuOptions>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Welcome</Text>
                    <Text style={styles.name} numberOfLines={1}>{name}</Text>
                </View>
            </Menu>


            {/* <View style={styles.right}>
                <TouchableHighlight onPress={()=>{}} activeOpacity={0.8} underlayColor={'transparent'} 
                    style={styles.notificationContainer}>
                    <View style={styles.notificationImageContainer}>
                        <Image source={notificationImage} style={styles.notificationImage} resizeMode='contain' />
                    </View>
                </TouchableHighlight>
            </View> */}
        </View>
    )
}

export default HeaderAvatar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        // width: '70%'
    },
    avatar: {
        width: 54,
        height: 54,
        marginRight: 10,
    },
    textContainer: {
        width: '80%'
    },
    title: {
        fontSize: 12,
        fontFamily: fonts.UbuntuLight,
        color: colors.light
    },
    name: {
        fontSize: 16,
        fontFamily: fonts.UbuntuRegular,
        color: colors.light,
        width: '100%',
        marginTop: 6
    },
    notificationContainer: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowColor: colors.light,
        elevation: 10,
        borderRadius: 50,
    },
    notificationImageContainer: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: colors.light
    },
    notificationImage: {
        width: 24,
        height: 24
    },
    menu: {
        position: 'relative',
        flexDirection: 'row',
        alignItems:'center'
    },
    menuOptions: {
        position: 'absolute',
        top: 50,
        left: 40,
        backgroundColor: 'white',
        paddingHorizontal: 30,
        paddingVertical: 4,
        borderRadius: 5,
        color:colors.primary,
        
    },
    singleMenuOption: {
        color:colors.primary,
        fontSize:14,
        fontFamily:fonts.UbuntuBold
    }
})
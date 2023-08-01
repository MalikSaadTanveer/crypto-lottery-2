import React from 'react';

import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import navigationString from '../utils/navigationString';

import {
 HomeScreen,
 GuideScreen,
 TicketInfoScreen,
 ResultScreen
} from '../screens'
// import TestingPage from '../screens/TestingPage';
// import TestingPage2 from '../screens/TestingPage2.jsx';


const RootStack = createNativeStackNavigator ();

const HomeStackScreens = () => (
    <RootStack.Navigator screenOptions={{headerShown:false,}}>
        
        {/* <RootStack.Screen name={"TestingPage"} component={TestingPage}/> */}
        {/* <RootStack.Screen name={"TestingPage2"} component={TestingPage2}/> */}
        <RootStack.Screen name={navigationString.HomeScreen} component={HomeScreen}/>
        <RootStack.Screen name={navigationString.GuideScreen} component={GuideScreen}/>
        <RootStack.Screen name={navigationString.TicketInfoScreen} component={TicketInfoScreen}/>
        <RootStack.Screen name={navigationString.ResultScreen} component={ResultScreen}/>      

    </RootStack.Navigator>
);

export default HomeStackScreens;
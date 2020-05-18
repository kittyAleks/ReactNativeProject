import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Platform } from 'react-native'
import {THEME} from '../theme'
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Components */
import MainScreen from "../screens/MainScreen"
import { DetailScreen } from "../screens/DetailScreen"
import BookedScreen from '../screens/BookedScreen'


const AppNavigator = createStackNavigator({
    MainScreen: {
        screen: MainScreen
    },
    DetailScreen: {
        screen: DetailScreen
    }
},{
    initialRouteName: "MainScreen",
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'ios' ? THEME.MAIN_COLOR : '#fff'
        },
        headerTintColor: Platform.OS === 'ios' ? '#fff' : THEME.MAIN_COLOR
    }
});

const BookedNavigator = createStackNavigator({
    BookedScreen: {
        screen: BookedScreen
    },
    DetailScreen: {
        screen: DetailScreen
    }
}, {
    initialRouteName: "BookedScreen",
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'ios' ? THEME.MAIN_COLOR : '#fff'
        },
        headerTintColor: Platform.OS === 'ios' ? '#fff' : THEME.MAIN_COLOR
    }
});

const BottomContainer = createBottomTabNavigator({
    Main: {
        screen: AppNavigator,
        navigationOptions: {
            tabBarIcon: info => <Ionicons size={18} color={info.tintColor} name='ios-albums'/>
        }
    },
    Booked: {
        screen: BookedNavigator,
        navigationOptions: {
            tabBarIcon: info => <Ionicons size={22} color={info.tintColor} name='ios-star-outline'/>
        }
    },
}, {
        tabBarOptions: {
            activeTintColor: THEME.MAIN_COLOR
        }
    }

);

export const AppContainer = createAppContainer(BottomContainer);


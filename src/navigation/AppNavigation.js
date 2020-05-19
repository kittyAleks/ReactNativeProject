import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import {createDrawerNavigator} from "react-navigation-drawer";
import { Platform } from 'react-native'
import {THEME} from '../theme'
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Components */
import MainScreen from "../screens/MainScreen"
import { DetailScreen } from "../screens/DetailScreen"
import BookedScreen from '../screens/BookedScreen'
import AboutScreen from "../screens/AboutScreen";
import CreateScreen from "../screens/CreateScreen";

const defaultNavigationOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'ios' ? THEME.MAIN_COLOR : '#fff'
        },
        headerTintColor: Platform.OS === 'ios' ? '#fff' : THEME.MAIN_COLOR
    }
}

const AppNavigator = createStackNavigator({
    MainScreen: MainScreen,
    DetailScreen: DetailScreen
}, defaultNavigationOptions );

const BookedNavigator = createStackNavigator(
    {
        BookedScreen: BookedScreen,
        DetailScreen: DetailScreen
    }, defaultNavigationOptions);

const BottomContainer = createBottomTabNavigator({
    Main: {
        screen: AppNavigator,
        navigationOptions: {
            tabBarLabel: 'All users',
            tabBarIcon: info => <Ionicons size={18} color={info.tintColor} name='ios-albums'/>
        }
    },
    Booked: {
        screen: BookedNavigator,
        navigationOptions: {
            tabBarLabel: 'Featured users',
            tabBarIcon: info => <Ionicons size={22} color={info.tintColor} name='ios-star-outline'/>
        }
    },
}, {
        tabBarOptions: {
            activeTintColor: THEME.MAIN_COLOR
        }
    },
);

const AboutNavigator = createStackNavigator({
    About: {
        screen: AboutScreen
    },
}, defaultNavigationOptions);

const CreateNavigator = createStackNavigator({
    Create: {
        screen: CreateScreen
    },
}, defaultNavigationOptions);

const DrawerNavigator = createDrawerNavigator({
    UsersList: BottomContainer,
    About: AboutNavigator,
    Create: CreateNavigator
});


export const AppContainer = createAppContainer(DrawerNavigator);


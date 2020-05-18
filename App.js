import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Button, FlatList } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import {AppContainer} from './src/navigation/AppNavigation';

export default class App extends React.Component {
  render() {
    return <AppContainer/>

  }
}



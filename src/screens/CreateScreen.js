import React, {useEffect, useState} from 'react'
import { View, StatusBar, StyleSheet, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import { Container, InputGroup, Input, Text, Button as NBButton, Icon as NBIcon} from 'native-base'
import {HeaderButton, HeaderButtons, Item} from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CreateScreen({navigation}) {

    return (
        <View style={{
            fontFamily:'Campton',
            flex:1,
        }}>
        </View>
    )
}
CreateScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'Create post',
    headerLeft: (<HeaderButtons>
        <Ionicons style={{paddingLeft: 20}} onPress={() => navigation.toggleDrawer()} name='ios-menu' color='white' size={25} />
    </HeaderButtons>)
});
const styles = StyleSheet.create({
    inputStyle: {
        borderWidth: 1,
        paddingLeft: 10,
        paddingBottom: 5,
        borderRadius: 5,
        borderColor: '#c9c9c9',
        height: 40,
    }

});



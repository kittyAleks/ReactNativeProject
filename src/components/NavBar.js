import React from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';


export const NavBar = (props) => {
    return (
        <View style={{...styles.navbar, ...Platform.select({
                ios: styles.navbarIos,
                android: styles.navbarAndroid
            })}}>
            <Text style={styles.text}>Users List</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    navbar: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        paddingBottom: 10,
    },
    navbarAndroid: {
        backgroundColor: '#00b7ad',
    },
    navbarIos: {
        backgroundColor: '#00b7ad',
    },

    text: {
        color: Platform.OS === 'ios' ? 'white' : '#e2e2e2',
        fontSize: 20,
    },
});


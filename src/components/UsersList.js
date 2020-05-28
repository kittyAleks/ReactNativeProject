import React, {useEffect, useState} from 'react'
import { View, StatusBar, StyleSheet, Image, Dimensions, TouchableOpacity, Button, FlatList } from 'react-native'
import { Container, InputGroup, Input, Text, Button as NBButton, Icon as NBIcon} from 'native-base'
import {PostRow} from "./PostRow";

export const UsersList = ({data=[], onOpen}) => {

    return (
        <View>
            <View style={{flex: 1}}>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => item.id}
                    renderItem={ ({item}) => <PostRow item={item} onOpen={onOpen}/>}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10,
        color: '#525252'
    },
});



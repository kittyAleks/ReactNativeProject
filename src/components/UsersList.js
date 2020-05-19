import React, {useEffect, useState} from 'react'
import { View, StatusBar, StyleSheet, Image, Dimensions, TouchableOpacity, Button, FlatList } from 'react-native'
import { Container, InputGroup, Input, Text, Button as NBButton, Icon as NBIcon} from 'native-base'
import {PostRow} from "./PostRow";

const url = 'https://testflatlist-5faf9.firebaseio.com/.json';

export const UsersList = ({item, rowID, onOpen}) => {

    const fetchTodos = async (url) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });
            const data = await response.json();
            return data

        } catch (e) {
            console.log('Ops...')
        }
    };

    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        fetchTodos(url).then((data) => setDataSource(data));
    }, []);

    return (
        <View>
            <View style={{flex: 1}}>
                <FlatList
                    data={dataSource}
                    keyExtractor={(item, index) => item.id}
                    renderItem={ ({item}) => <PostRow item={item} onOpen={onOpen}/>}
                />
            </View>
        </View>
    )
}

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



import React, { useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Image, Button, ScrollView, Alert, TouchableOpacity } from 'react-native';
import {HeaderButtons} from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux"
import {removeUser, toggleBooked} from "../store/action/postAction";

export const DetailScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const item = navigation.getParam('item');
    const profile_image = navigation.getParam('image');

    const items = useSelector(state =>
        state.user.allUsers.find(p => p.id === item.id)
    );
    console.log('AAA items', items)

    // const dataSource = navigation.getParam('dataSource');

    const booked = useSelector(state =>
        state.user.bookedUsers.some(user => user.id === item.id)
    );
    useEffect(() => {navigation.setParams({ booked })}, [booked]);

    const toggleHandler = useCallback(() => {
        dispatch(toggleBooked(items))
    },[dispatch, items]);

    useEffect(() => {
        navigation.setParams({toggleHandler})
    }, [toggleHandler]);

    const removeHandler = () => {
        Alert.alert(
            'Delete item',
            `Are you sure you want to remove ${items.first_name} element?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                { text: 'Delete', style: 'destructive',
                    onPress: () => {
                    navigation.navigate('MainScreen')
                        dispatch(removeUser(items.id))
                    }
                },
            ],
            { cancelable: false }
        );
    };
    if(!items) {
        return null
    }

    return (
        <ScrollView>
            <View style={styles.detailContainer}>
                <View style={{fontSize: 30}}>
                    <Text style={{fontSize: 20}}>{items.first_name}{' '}</Text>
                </View>
                <View style={{paddingTop: 20}}>
                    <Image
                        source={{uri: items.profile_image}}
                        style={styles.imageStyle}
                    />
                </View>
                <Button title='Delete' item={item} onPress={removeHandler} color={'#ef003d'}

                />
                <Button title='Go back' color={'#7e7e7e'}
                        onPress={() => navigation.navigate('MainScreen')}
                />

            </View>
        </ScrollView>
    );
}

DetailScreen.navigationOptions = ({navigation}) => {
    const user = navigation.getParam('item');
    const liked_by_user = navigation.getParam('liked_by_user');
    const toggleHandler = navigation.getParam('toggleHandler');

    const iconName = liked_by_user? 'md-star': 'md-star-outline';
    return {
        headerTitle: user.first_name,
        headerRight: (<TouchableOpacity onPress={toggleHandler}>
            <Ionicons style={{paddingRight: 10}} name={iconName} color='white' size={25}/>
        </TouchableOpacity>),
    }
};

const styles = StyleSheet.create({
    detailContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40
    },
    imageStyle: {
        width: 350,
        height: 350,
        borderRadius: 20,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#fff'
    }
});

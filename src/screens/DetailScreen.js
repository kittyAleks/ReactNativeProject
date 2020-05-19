import React, {Component, useEffect, useCallback} from 'react';
import {StyleSheet, View, Text, Image, Button, ScrollView, Alert} from 'react-native';
import {SceneView} from 'react-navigation';
import {HeaderButtons} from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const DetailScreen = ({navigation}) => {
    const item = navigation.getParam('item');
    console.log('QQQ item', item)
    const dataSource = navigation.getParam('dataSource');
    console.log('QQQ dataSource', dataSource)

    // useEffect(() => {navigation.setParams({liked_by_user: item.liked_by_user})}, [])

    const removeHandler = (id) => {
        Alert.alert(
            'Delete item',
            `Are you sure you want to remove ${item.user.first_name} element?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                { text: 'Delete', style: 'destructive',
                    onPress: async () => {
                        try {
                            await fetch(`https://testflatlist-5faf9.firebaseio.com/${id}.json`, {
                                method: 'DELETE',
                                headers: {'Content-Type': 'application/json'},
                            })
                        } catch (e) {
                            alert('Error', e)
                        }
                    }
                },
            ],
            { cancelable: false }
        );
    }

    return (
        <ScrollView>
            <View style={styles.detailContainer}>
                <View style={{fontSize: 30}}>
                    <Text style={{fontSize: 20}}>{item.user.first_name}{' '}</Text>
                </View>
                <View style={{paddingTop: 20}}>
                    <Image
                        source={{uri: `${item.user.profile_image.large}`}}
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

    const iconName = liked_by_user? 'md-star': 'md-star-outline';
    return {
        headerTitle: user.user.first_name,
        headerRight: (<HeaderButtons>
            <Ionicons style={{paddingRight: 10}} name={iconName} color='white' size={25} />
        </HeaderButtons>),
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
import React, {useEffect, useState} from 'react'
import { View, StatusBar, StyleSheet, Image, Dimensions, TouchableOpacity, Button, FlatList } from 'react-native'
import { Container, InputGroup, Input, Text, Button as NBButton, Icon as NBIcon} from 'native-base'
import {HeaderButton, HeaderButtons, Item} from 'react-navigation-header-buttons';

import { PostRow } from '../components/PostRow'
import Ionicons from 'react-native-vector-icons/Ionicons';

const url = 'https://testflatlist-5faf9.firebaseio.com/.json';

export default function BookedScreen({navigation}) {

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

    const [dataSource, setDataSource] = useState();

    useEffect(() => {
        fetchTodos(url).then((data) => setDataSource(data));
    }, []);

    const openDetailScreen = item => {
        navigation.navigate('DetailScreen', {item: item, liked_by_user: item.liked_by_user})
    };

    // onSearchNameTextChange = (value) => {
    //     this.setState({searchText: value});
    //
    //     const newData = this.state.data.filter(item => {
    //         const itemData = item.user.first_name ? item.user.first_name.toUpperCase() : ''.toUpperCase();
    //         const textData = value.toUpperCase();
    //         return itemData.indexOf(textData) > -1;
    //     });
    //     this.setState({data: newData, value: value})
    //     if(value === '') {
    //         this.setState({data: [...this.state.temp]}
    //         )}
    // };

    return (
        <Container style={{
            fontFamily:'Campton',
            flex:1,
        }}>
            <View style={{
                paddingHorizontal: 10,
                marginRight: 5,
            }}>
                {/*<HeaderButton*/}
                {/*    iconSize={20}*/}
                {/*    color={'#525252'}*/}
                {/*    IconComponent={Ionicons}*/}
                {/*/>*/}


                <InputGroup style={{marginTop: 6, marginBottom: 10}} borderType='regular'>
                    <Input
                        style={styles.inputStyle}
                        borderType='regular'
                        // value={searchText}
                        autoCapitalize="none"
                        autoCorrect={false}
                        // onChangeText={onSearchNameTextChange}
                        placeholder='Search by name'/>
                </InputGroup>
            </View>

            <View style={{flex: 1}}>
                <FlatList
                    data={dataSource}
                    keyExtractor={(item, index) => item.id}
                    renderItem={ ({item}) => <PostRow item={item} onOpen={openDetailScreen}/>}
                />
            </View>
        </Container>
    )
}
BookedScreen.navigationOptions = {
    headerTitle: 'Users List',
    headerRight: (<HeaderButtons>
        <Ionicons style={{paddingRight: 10}} name='ios-camera' color='white' size={25} />
        {/*<Item title='Add photo' color='white' onPress={() => alert('Hi')} iconName='ios-menu'/>*/}
    </HeaderButtons>),


    headerLeft: (<HeaderButtons>
        <Ionicons style={{paddingLeft: 20}} onPress={() => alert('He')} name='ios-menu' color='white' size={25} />
        {/*<Item title='Add photo' color='white' onPress={() => alert('Hi')} iconName='ios-menu'/>*/}
    </HeaderButtons>)
};
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



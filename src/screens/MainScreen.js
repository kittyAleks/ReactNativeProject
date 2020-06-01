import React, {useEffect, useState} from 'react'
import { View, StatusBar, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import { Container, InputGroup, Input, Text, Button as NBButton, Icon as NBIcon} from 'native-base'
import {HeaderButton, HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useDispatch, useSelector} from "react-redux"
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PostRow} from "../components/PostRow";
import {loadUsers} from "../store/action/postAction";
import {UsersList} from "../components/UsersList";
import {DB} from '../db'
import {THEME} from "../theme";

// const url = 'https://testflatlist-5faf9.firebaseio.com/.json';

export default function MainScreen({navigation}) {
    try {
        DB.init();
        console.log('DataBase started...')
    } catch (e) {
        console.log('Error', e)
    }
    // const fetchTodos = async (url) => {
    //     try {
    //         const response = await fetch(url, {
    //             method: 'GET',
    //             headers: {'Content-Type': 'application/json'},
    //         });
    //         const data = await response.json();
    //         console.log('ssss data', data)
    //
    //     return data
    //
    //     } catch (e) {
    //         console.log('Ops...')
    //     }
    // };
    //
    // const [dataSource, setDataSource] = useState();
    //
    // useEffect(() => {
    //     fetchTodos(url).then((data) => setDataSource(data));
    // }, []);
    //
    const openDetailScreen = item => {
        navigation.navigate('DetailScreen', {item: item, liked_by_user: item.liked_by_user, image: item.profile_image })
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUsers())

    }, [dispatch]);

    const allUsers = useSelector(state => state.user.allUsers);
    console.log('WWW allUsers', allUsers);
    const loading = useSelector(state => state.user.loading);

    if(loading && !allUsers.length) {
        return <View style={styles.loadCenter}>
            <ActivityIndicator color={THEME.MAIN_COLOR} size='large'/>
                <Text style={styles.text}>No posts yet ^^)</Text>
        </View>
    }

    // if(!allUsers.length) {
    //     return <View style={styles.wrapper}>
    //         <Text style={styles.text}>No posts yet ^^)</Text>
    //     </View>
    // }

/*    onSearchNameTextChange = (value) => {
        this.setState({searchText: value});

        const newData = this.state.data.filter(item => {
            const itemData = item.user.first_name ? item.user.first_name.toUpperCase() : ''.toUpperCase();
            const textData = value.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({data: newData, value: value})
        if(value === '') {
            this.setState({data: [...this.state.temp]}
            )}
    };*/

    return (
        <Container style={{
            fontFamily:'Campton',
            flex:1,
        }}>
            <View style={{
                paddingHorizontal: 10,
                marginRight: 5,
            }}>
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
            <UsersList/>
            <View style={{flex: 1}}>
                <FlatList
                    data={allUsers}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={ ({item}) => <PostRow item={item} onOpen={openDetailScreen}/>}
                />
            </View>
        </Container>
    )
}
MainScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'Users List',
    headerRight: (<HeaderButtons>
        <Ionicons style={{paddingRight: 10}} onPress={() => navigation.navigate('Create')}
                  name='ios-camera' color='white' size={25} />
    </HeaderButtons>),


    headerLeft: (<HeaderButtons>
        <Ionicons style={{paddingLeft: 20}} onPress={() => navigation.toggleDrawer()} name='ios-menu' color='white' size={25} />
    </HeaderButtons>)
});
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
    inputStyle: {
        borderWidth: 1,
        paddingLeft: 10,
        paddingBottom: 5,
        borderRadius: 5,
        borderColor: '#c9c9c9',
        height: 40,
    },
    loadCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

});



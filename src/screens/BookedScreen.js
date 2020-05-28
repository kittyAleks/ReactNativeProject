import React, {useEffect} from 'react'
import { View, StatusBar, StyleSheet, Image, Dimensions, TouchableOpacity, Button, FlatList } from 'react-native'
import { Container, InputGroup, Input, Text, Button as NBButton, Icon as NBIcon} from 'native-base'
import {HeaderButton, HeaderButtons, Item} from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux'
import { PostRow } from '../components/PostRow'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DATA } from '../data'

// const url = 'https://testflatlist-5faf9.firebaseio.com/.json';

export default function BookedScreen({navigation}) {
    // const fetchTodos = async (url) => {
    //     try {
    //         const response = await fetch(url, {
    //             method: 'GET',
    //             headers: {'Content-Type': 'application/json'},
    //         });
    //         const data = await response.json();
    //         return data
    //     } catch (e) {
    //         console.log('Opss...')
    //     }
    // };
    //
    // const [dataSource, setDataSource] = useState([]);
    // useEffect(() => {
    //     fetchTodos(url).then((data) => setDataSource(data));
    // }, []);
    // const data = DATA.filter(user => user.liked_by_user);

    const bookedUsers = useSelector (state => state.user.bookedUsers);
    console.log('QQQ bookedUsers', bookedUsers);
    if(!bookedUsers.length) {
        return <View style={styles.wrapper}>
            <Text style={styles.text}>No posts yet ^^)</Text>
        </View>
    }

    const openDetailScreen = item => {
        navigation.navigate('DetailScreen', {item: item, liked_by_user: item.liked_by_user })
    };

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

            <View style={{flex: 1}}>
                <FlatList
                    data={bookedUsers}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={ ({item}) => <PostRow item={item} onOpen={openDetailScreen}/>}
                />
            </View>
        </Container>
    )
}
BookedScreen.navigationOptions = ({ navigation }) =>({
    headerTitle: 'Users List',
    headerLeft: (<HeaderButtons>
        <Ionicons style={{paddingLeft: 20}} onPress={() => navigation.toggleDrawer()} name='ios-menu' color='white' size={25} />
        {/*<Item title='Add photo' color='white' onPress={() => alert('Hi')} iconName='ios-menu'/>*/}
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
    }

});



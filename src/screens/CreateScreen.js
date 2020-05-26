import React, {useEffect, useState} from 'react'
import {View, Keyboard, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, TextInput, Button} from 'react-native'
import { Container, InputGroup, Input, Text, Button as NBButton, Icon as NBIcon} from 'native-base'
import {HeaderButton, HeaderButtons, Item} from 'react-navigation-header-buttons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {THEME} from "../theme"
import { useDispatch } from 'react-redux'
import { addUser } from "../store/action/postAction";

export default function CreateScreen({navigation}) {
    const [text, setText] = useState('');
    const profile_image = "https://images.unsplash.com/profile-fb-1456184697-467e46e57ac3.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=300&w=300";

    const dispatch = useDispatch();
    const saveHandler = () => {
        const newUser = {
            updated_at: new Date().toJSON(),
            liked_by_user: false,
            first_name: text,
            profile_image: profile_image,
        };
        dispatch(addUser(newUser));
        navigation.navigate('MainScreen')
    };

    return (
        /* Keyboard.dismiss - закрывает автом-и клавиатуру после вводу текста */
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.wrapper}>
                <Text style={styles.text}>Сreate a new user</Text>
                <View style={styles.textAreaContainer}>
                    <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder='Enter text'
                        placeholderTextColor="#8f9bae"
                        numberOfLines={10}
                        multiline={true}
                        onChangeText={setText}
                        value={text}/>
                </View>
                <Image
                    source={{uri: profile_image}}
                    style={styles.imageStyle}
                />
                <Button title='Create user' color={THEME.MAIN_COLOR} onPress={saveHandler} />
            </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}
CreateScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'Create post',
    headerLeft: (
        <HeaderButtons>
            <Ionicons style={{paddingLeft: 20}} onPress={() => navigation.toggleDrawer()} name='ios-menu' color='white' size={25} />
        </HeaderButtons>
    )
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
    textAreaContainer: {
        width: '100%',
        borderRadius: 5,
        borderColor: '#d2dadd',
        borderWidth: 1,
        paddingHorizontal: 5,
        paddingTop: 6,
        paddingBottom: 11,
    },
    textArea: {
        width: '100%',
        fontSize: 16,
        paddingHorizontal: 10,
    },
    imageStyle: {
        width: 350,
        height: 350,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        alignSelf: 'center',
        marginVertical: 20
    }
});



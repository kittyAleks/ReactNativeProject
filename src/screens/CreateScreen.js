import React, {useEffect, useState, useRef } from 'react'
import {View, Keyboard, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, TextInput, Button} from 'react-native'
import { Container, InputGroup, Input, Text, Button as NBButton, Icon as NBIcon} from 'native-base'
import {HeaderButton, HeaderButtons, Item} from 'react-navigation-header-buttons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {THEME} from "../theme"
import { useDispatch } from 'react-redux'
import { addUser } from "../store/action/postAction";
import { PhotoPicker } from '../components/PhotoPicker'

export default function CreateScreen({navigation}) {
    const [text, setText] = useState('');
    const imgRef = useRef();

    const dispatch = useDispatch();
    const saveHandler = () => {
        const newUser = {
            updated_at: new Date().toJSON(),
            liked_by_user: false,
            first_name: text,
            profile_image: imgRef.current.source,
        };
        console.log('AAA  newUser.profile_image', newUser.profile_image)
        dispatch(addUser(newUser));
        navigation.navigate('MainScreen')
    };

    const pickerHandler = source => {
        imgRef.current = source
    };
    console.log('AAA imgRef.current', imgRef.current);

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
                <PhotoPicker onPicker={pickerHandler}/>
                <Button disabled={!text || !imgRef.current}
                        title='Create user'
                        color={THEME.MAIN_COLOR}
                        onPress={saveHandler} />
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



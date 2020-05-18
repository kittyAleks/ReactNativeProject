import React from 'react';
import {View, StyleSheet, Text, Platform, TouchableOpacity, Image, Button} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const PostRow = ({item, rowID, onOpen}) => {
    return (
        <View style={{paddingHorizontal: 20,}}>
            <TouchableOpacity style={{
                paddingTop: 10,
                borderBottomWidth: 1, borderColor: '#868b9b',
            }}
                              key={rowID}>
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <TouchableOpacity>
                            <Image
                                source={{uri: `${item.user.profile_image.large}`}}
                                style={styles.imageStyle}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection: 'column', flex: 50, marginLeft: 30, justifyContent: 'center'}}>
                        <TouchableOpacity>
                            <View>
                                <Text style={{fontSize: 18, color: '#7f7f7f'}}>{item.user.first_name}{' '}{item.user.last_name}</Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={{
                            color: '#7f7f7f',
                            fontSize: 15,
                            paddingTop: 10
                        }}>{new Date(item.user.updated_at).toLocaleDateString()}</Text>
                    </View>

                    <View style={{
                        flex: 25,
                        alignItems: 'flex-end',
                        justifyContent: 'center'
                    }}>
                        <Ionicons name='ios-arrow-forward' color={'#7e7e7e'} size={25} onPress={() => onOpen(item)} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    imageStyle: {
        width: 80,
        height: 80,
        borderRadius: 80/ 2,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
});


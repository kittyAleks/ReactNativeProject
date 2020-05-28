import React, { useState } from 'react';
import {View, StyleSheet, Text, Platform, Image, Button} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {THEME} from "../theme";

export const PhotoPicker = ({onPicker}) => {
    const [image, setImage] = useState(null);

    const takePhoto = () => {
        const options = {
            title: 'Select a Image',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        };
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = {
                    source: response.uri
                };
                console.log('source ', source);
                // setImage({
                //     filePath: source,
                // });
                setImage(source);
                onPicker(source)
            }
        })
    };

    return (
        <View styly={styles.wrapper}>
            {image &&
            <Image
                source={{uri: image.source}}
                style={styles.imageStyle}
            />
            }
            <Button title='Take a photo' color={THEME.MAIN_COLOR} onPress={takePhoto} />
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    imageStyle: {
        width: 350,
        height: 350,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        alignSelf: 'center',
        marginVertical: 20
    },
    text: {
        color: Platform.OS === 'ios' ? 'white' : '#e2e2e2',
        fontSize: 20,
    },

});


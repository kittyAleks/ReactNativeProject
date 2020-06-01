import FileSystem from 'react-native-filesystem'
import { LOAD_USERS, TOGGLE_BOOKED, REMOVE_USER, ADD_USER } from "../types"
import {DB} from "../../db"

export const loadUsers = () => {
    return async dispatch => {
        const users = await DB.getUsers();
        dispatch({
            type: 'LOAD_USERS',
            payload: users
        })
    }
};
export const toggleBooked = user => async dispatch => {
    await DB.updateUser(user);
    dispatch ({
        type: 'TOGGLE_BOOKED',
        payload: user.id
    })
};
export const removeUser = id => async dispatch => {
    await DB.removeUser(id);
    dispatch ({
        type: 'REMOVE_USER',
        payload: id
    })
};
export const addUser = user => async dispatch => {
    // const fileName = user.profile_image.split('/').pop();
    // console.log('QQQ fileName', fileName);
    //
    const newPath = FileSystem.directoryExists + user.profile_image;
    console.log('QQQ newPath', newPath);

    // try {
    //     await FileSystem.readFile({
    //         to: newPath,
    //         from: user.profile_image
    //     })
    // } catch (e) {
    //     console.log('Error :(', e)
    // }

    const payload = {...user, profile_image: user.profile_image};
    console.log('QQQ payload', payload);

    const id = await DB.createUsers(payload);
    payload.id = id;

    dispatch({
        type: 'ADD_USER',
        payload
    })
};


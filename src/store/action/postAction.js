import { LOAD_USERS, TOGGLE_BOOKED, REMOVE_USER, ADD_USER } from "../types"
import { DATA } from '../../../src/data.js'

export const loadUsers = () => {
    return {
        type: 'LOAD_USERS',
        payload: DATA
    }
};
export const toggleBooked = id => {
    return {
        type: 'TOGGLE_BOOKED',
        payload: id
    }
};
export const removeUser = id => {
    return {
        type: 'REMOVE_USER',
        payload: id
    }
};
export const addUser = user => {
    user.id = Date.now().toString;
    return {
        type: 'ADD_USER',
        payload: user
    }
};


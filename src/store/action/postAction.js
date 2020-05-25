import { LOAD_USERS } from "../types"
import { TOGGLE_BOOKED } from "../types"
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


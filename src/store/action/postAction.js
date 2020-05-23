import { LOAD_USERS } from "../types";
import { DATA } from '../../../src/data.js'
export const loadUsers = () => {
    return {
        type: 'LOAD_USERS',
        payload: DATA
    }
};
console.log('DATA',DATA)


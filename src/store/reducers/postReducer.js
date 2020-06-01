import {ADD_USER, LOAD_USERS, REMOVE_USER, TOGGLE_BOOKED} from "../types";

const initialState = {
    allUsers: [],
    bookedUsers: [],
    loading: true
};

export const postReducer = (state = initialState, action) => {
    console.log('EEE action', action);
    switch (action.type) {
        case LOAD_USERS: return {
            ...state, allUsers: action.payload,
            bookedUsers: action.payload.filter(user => user.liked_by_user),
            loading: false
        };
        case TOGGLE_BOOKED:
            const allUsers = state.allUsers.map(user => {
                if(user.id === action.payload) {
                    user.liked_by_user = !user.liked_by_user
                } return user
            });
            return {...state,
                allUsers,
                bookedUsers: allUsers.filter(user => user.liked_by_user)
            };
        case REMOVE_USER: return {
            ...state, allUsers: state.allUsers.filter(p => p.id !== action.payload),
            bookedUsers: state.bookedUsers.filter(p => p.id !== action.payload)
        };
        case ADD_USER: return {
            ...state, allUsers: [{...action.payload}, ...state.allUsers],
        };


        default: return state
     }
};


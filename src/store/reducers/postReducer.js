import {LOAD_USERS, TOGGLE_BOOKED} from "../types";

const initialState = {
    allUsers: [],
    bookedUsers: []
};

export const postReducer = (state = initialState, action) => {
    console.log('EEE action', action);
    switch (action.type) {
        case LOAD_USERS: return {
            ...state, allUsers: action.payload,
            bookedUsers: action.payload.filter(user => user.liked_by_user)
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

        default: return state
     }
};


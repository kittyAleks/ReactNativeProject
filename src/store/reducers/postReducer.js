import { LOAD_USERS } from "../types";

const initialState = {
    allUsers: [],
    bookedUsers: []
};

export const postReducer = (state = initialState, action) => {
    console.log('EEE action', action)
     switch (action.type) {
          case LOAD_USERS: return {
            ...state, allUsers: action.payload,
            bookedUsers: action.payload.filter(user => user.liked_by_user === true)
        };
        default: return state
     }
};


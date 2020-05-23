import { combineReducers, createStore } from "redux";
import { postReducer } from './reducers/postReducer'

const rootReducer = combineReducers ({
    user: postReducer

});

export default createStore(rootReducer)

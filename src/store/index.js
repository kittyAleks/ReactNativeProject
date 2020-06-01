import { combineReducers, createStore, applyMiddleware} from "redux";
import { postReducer } from './reducers/postReducer'
import thunk from "redux-thunk";

const rootReducer = combineReducers ({
    user: postReducer

});

export default createStore(rootReducer, applyMiddleware(thunk))

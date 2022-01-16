import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import { toastReducer as toast } from 'react-native-redux-toast';
import auth from './reducers/auth';
import modal from './reducers/modal';
import app from './reducers/app';
const rootReducer = combineReducers({
    toast,
    auth,
    modal,
    app
})

const configureStore = ()=>{
    return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;
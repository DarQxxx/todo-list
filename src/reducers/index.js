import isLoggedReducer from "./isLogged";
import userDataReducer from "./userData";
import {combineReducers} from 'redux';
import setDateReducer from "./setDate";



const allReducers = combineReducers({
    isLogged : isLoggedReducer,
    userData : userDataReducer,
    date : setDateReducer

})

export default allReducers;
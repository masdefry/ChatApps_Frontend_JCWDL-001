import { combineReducers } from "redux";

// Import Reducers
import userReducer from './UserReducer';

const allReducer = combineReducers({
    user: userReducer
})

export default allReducer
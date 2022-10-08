import todoReducers from "./todoReducers";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    todoReducers
})

export default rootReducer                              //this will go to store(Global store)
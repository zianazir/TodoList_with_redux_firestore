import { createStore , applyMiddleware } from 'redux';
import rootReducer from './Reducer';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const store = createStore(rootReducer,{} , composeWithDevTools(applyMiddleware(thunk)))

export default store                            //import the store in main.jsx with providers so that it gets connected
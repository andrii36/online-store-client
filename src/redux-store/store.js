import { applyMiddleware, combineReducers, createStore } from "redux";
import deviceReducer from "./content-reducer";
import thunk from 'redux-thunk'
import authReducer from "./auth-reducer";
import modalModesReducer from "./modal-modes-reducer";

const reducers = combineReducers({
    content: deviceReducer,
    auth: authReducer,
    modalModes: modalModesReducer
})

const store = createStore(reducers, applyMiddleware(thunk))
export default store
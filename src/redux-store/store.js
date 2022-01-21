import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import deviceReducer from "./content-reducer";
import thunk from 'redux-thunk'
import authReducer from "./auth-reducer";
import modalModesReducer from "./modal-modes-reducer";

const reducers = combineReducers({
    content: deviceReducer,
    auth: authReducer,
    modalModes: modalModesReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))
export default store
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import deviceReducer from "./content-reducer";
import thunk from 'redux-thunk';
import logger from "redux-logger";
import userReducer from "./user-reducer";
import modalModesReducer from "./modal-modes-reducer";
import appReducer from "./app-reducer";
import teamReducer from "./team-reducer";
import fleetReducer from "./fleet-reducer";
import constantsReducer from "./constants-reducer";
import companyReducer from "./company-reducer";

const persistConfig = {
    key: 'root', // key for storing your state in localStorage
    storage,
};

const rootReducer = combineReducers({
    app: appReducer,
    content: deviceReducer,
    user: userReducer,
    modalModes: modalModesReducer,
    team: teamReducer,
    fleet: fleetReducer,
    constants: constantsReducer,
    company: companyReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk, logger)))
const persistor = persistStore(store);
persistor.purge()
export { store, persistor };
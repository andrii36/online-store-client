const initialState = {
    fleet: [],
    currentVehicle: null,
    dataIsLoading: false,
    message: '',
}

const fleetReducer = (state = initialState, action) => {
    const {type, fleet} = action
    switch(type){
        case 'GET_ALL_FLEET_SUCCESS': {
            return {
                ...state, dataIsLoading: false, fleet, message: ''
            }
        }
        case 'GET_ALL_FLEET_FAIL': {
            return {
                ...state, dataIsLoading: false, message: action.message,
            }
        }
        case 'SET_DATA_IS_LOADING': {
            return {
                ...state,
                dataIsLoading: true
            }
        }
        case 'SET_MESSAGE': {
            return {...state, message: action.message}
        }
        case 'SET_CURRENT_VEHICLE': {
            return {...state, currentVehicle: action.vehicle, dataIsLoading: false}
        }
    }
    return state
}

export default fleetReducer;
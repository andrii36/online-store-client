const initialState = {
    dataIsLoading: false,
    message: '',
}

const constantsReducer = (state = initialState, action) => {
    const {type, constantsData} = action
    switch(type){
        case 'GET_CONSTANTS_SUCCESS': {
            return {
                ...state, dataIsLoading: false, [constantsData.name]: constantsData, message: ''
            }
        }
        case 'GET_CONSTANTS_FAIL': {
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
    }
    return state
}

export default constantsReducer;
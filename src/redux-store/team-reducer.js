const initialState = {
    users: [],
    dataIsLoading: false,
    message: '',
}

const teamReducer = (state = initialState, action) => {
    const {type, users} = action
    switch(type){
        case 'GET_ALL_USERS_SUCCESS': {
            return {
                ...state, dataIsLoading: false, users, message: ''
            }
        }
        case 'GET_ALL_USERS_FAIL': {
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

export default teamReducer;
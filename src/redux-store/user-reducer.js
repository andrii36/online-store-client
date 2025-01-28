const initialState = {
    currentUser: null,
    isAuthorised: false,
    dataIsLoading: false,
    message: ''
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case 'AUTH_USER_SUCCESS': {
            return {
                ...state,
                currentUser: action.user,
                isAuthorised: true,
                dataIsLoading: false,
                message: ''
            }
        }
        case 'AUTH_USER_FAIL': {
            return {
                ...state,
                isAuthorised: false,
                message: action.message,
                dataIsLoading: false,
            }
        }
        case 'SET_USER_DATA': {
            return {
                ...state,
                currentUser: action.user,
                dataIsLoading: false,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                currentUser: null,
                isAuthorised: false,
                message: '',
                dataIsLoading: false
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

export default userReducer
const initialState = {
    currentUser: {
        id: null,
        userName: null,
        role: null
    },
    isAuthorised: false,
    dataIsLoading: false,
    message: ''
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case 'AUTH_USER_SUCCESS': {
            const {id, userName, role} = action
            return {
                ...state,
                currentUser: {
                    id,
                    userName,
                    role
                },
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
        case 'LOGOUT': {
            return {
                ...state,
                currentUser: {
                    id: null,
                    userName: null,
                    role: null
                },
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

export default authReducer
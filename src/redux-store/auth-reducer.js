import { api } from "../api/api"

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
                    id: id,
                    userName: userName,
                    role: role
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

const authUserSuccessAC = ({id, userName, role}) => ({type: 'AUTH_USER_SUCCESS', id, userName, role})
const authUserFailAC = (message) => ({type: 'AUTH_USER_FAIL', message})
const setDataIsLoadingAC = () => ({type: 'SET_DATA_IS_LOADING'})
export const logoutAC = () => ({type: 'LOGOUT'})

export const loginThunk = ({email, password}) => async (dispatch) => {
    try{
        dispatch(setDataIsLoadingAC())
        const response = await api.login({email, password})
        if(response.data.code === 0) {
            localStorage.setItem('authtoken', response.data.token)
            dispatch(authUserSuccessAC(response.data.data))
        }
    }catch(e){
        dispatch(authUserFailAC(e.response.data.message))
    }
}
export const authmeThunk = () => async (dispatch) => {
    try{
        const response = await api.authme()
        if(response.data.code === 0) {
            dispatch(authUserSuccessAC(response.data.data))
        }
    }catch(e){
        dispatch(authUserFailAC(e.response.data.message))
    }
}
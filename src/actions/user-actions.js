import { api } from "../api/api"
import { initialize } from "./app-actions"

const setUserDataAC = (user) => ({type: 'SET_USER_DATA', user})
const authUserSuccessAC = (user) => ({type: 'AUTH_USER_SUCCESS', user})
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

export const signupThunk = ({email, password, userName}) => async (dispatch) => {
    try {
        dispatch(setDataIsLoadingAC())
        const response = await api.createUser({email, password, userName})
        if(response.data.code === 0) {
            localStorage.setItem('authtoken', response.data.token)
            dispatch(authUserSuccessAC(response.data.data))
        }
    } catch (e) {
        dispatch(authUserFailAC(e.response.data.message))
    }
}

export const authmeThunk = () => async (dispatch) => {
    try{
        const response = await api.authme()
        if(response.data.code === 0) {
            dispatch(authUserSuccessAC(response.data.data))
        }
        dispatch(initialize())
    }catch(e){
        console.log(e)
        dispatch(authUserFailAC(e.response.message))
    }
}

export const updateUserThunk = (updatedUser) => async (dispatch) => {
    try {
        const {data} = await api.updateUser(updatedUser)
        dispatch(setUserDataAC(data.user))
    } catch (error) {
        console.log(error.message)
    }
}
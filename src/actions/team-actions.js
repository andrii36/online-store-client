import { api } from "../api/api"

const getAllUsersSuccessAC = (data) => ({type: 'GET_ALL_USERS_SUCCESS', users: [...data]})
const getAllUsersFailAC = (message) => ({type: 'GET_ALL_USERS_FAIL', message})
const setDataIsLoadingAC = () => ({type: 'SET_DATA_IS_LOADING'})

export const getAllUsersThunk = () => async (dispatch, getState) => {
    try{
        dispatch(setDataIsLoadingAC())
        const response = await api.getAllUsers(getState().user.currentUser.company)
        dispatch(getAllUsersSuccessAC(response.data))
    }catch(e){
        dispatch(getAllUsersFailAC(e.response.data.message))
    }
}
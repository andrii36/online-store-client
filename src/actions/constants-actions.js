import { api } from "../api/api"

const getConstantsSuccessAC = (data) => ({type: 'GET_CONSTANTS_SUCCESS', constantsData: {...data}})
const getConstantsFailAC = (message) => ({type: 'GET_CONSTANTS_FAIL', message})
const setDataIsLoadingAC = () => ({type: 'SET_DATA_IS_LOADING'})

export const getConstantsThunk = (type) => async (dispatch) => {
    try{
        dispatch(setDataIsLoadingAC())
        const response = await api.getConstants(type)
        dispatch(getConstantsSuccessAC(response.data))
    }catch(e){
        dispatch(getConstantsFailAC(e.response.data.message))
    }
}
import { api } from "../api/api"

const getAllFleetSuccessAC = (data) => ({type: 'GET_ALL_FLEET_SUCCESS', fleet: [...data]})
const getAllFleetFailAC = (message) => ({type: 'GET_ALL_FLEET_FAIL', message})
export const setFleetDataIsLoadingAC = () => ({type: 'SET_DATA_IS_LOADING'})
const setMessage = (message) => ({type: 'SET_MESSAGE', message})
export const setVehicleDataAC = (vehicle) => ({type: 'SET_CURRENT_VEHICLE', vehicle})

export const getAllFleetThunk = () => async (dispatch, getState) => {
    try{
        dispatch(setFleetDataIsLoadingAC())
        const response = await api.getAllFleet(getState().user.currentUser.company)
        dispatch(getAllFleetSuccessAC(response.data))
    }catch(e){
        console.log(e)
        dispatch(getAllFleetFailAC(e.response.message))
    }
}

export const updateVehicleServiceHistoryThunk = (serviceHistory, id) => async (dispatch) => {
    try{
        const {data} = await api.updateVehicleServiceHistory(serviceHistory, id)
        dispatch(setMessage(data.message))
        dispatch(getAllFleetThunk())
        dispatch(setVehicleDataAC(data.updatedVehicle))
    }catch({response}){
        dispatch(setMessage(response.data.message))
    }
}
import { useEffect } from "react";
import VehicleInfo from "./VehicleInfo";
import { useDispatch, useSelector } from "react-redux";
import { setFleetDataIsLoadingAC, setVehicleDataAC, updateVehicleServiceHistoryThunk } from "../../actions/fleet-actions";

const VehicleInfoContainer = (props) => {
    const dispatch = useDispatch()
    const fleet = useSelector(state => state.fleet)

    useEffect(() => {
        dispatch(setFleetDataIsLoadingAC())
        dispatch(setVehicleDataAC(fleet.fleet.filter((item => item._id === props.vehicleId))[0]))
        return () => {
            dispatch(setVehicleDataAC(null))
        }
    }, [])

    const handleDeleteItem = (event, record) => {
        event.stopPropagation()
        const newServiceHistory = [...fleet.currentVehicle.serviceHistory].filter((el, i) => i !== record.key)
        dispatch(updateVehicleServiceHistoryThunk(newServiceHistory, fleet.currentVehicle._id))
    }

    const handleEditItem = () => {
        
    }

    const handleStatusUpdate = (status, index) => {
        const newServiceHistory = [...fleet.currentVehicle.serviceHistory]
        newServiceHistory[index].status = status

        dispatch(updateVehicleServiceHistoryThunk(newServiceHistory, fleet.currentVehicle._id))
    }

    return (
        <VehicleInfo
            currentVehicle={fleet.currentVehicle}
            handleStatusUpdate={handleStatusUpdate}
            dataIsLoading={fleet.dataIsLoading}
            handleDeleteItem={handleDeleteItem}
            handleEditItem={handleEditItem}
        />
    )
}

export default VehicleInfoContainer;
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FleetPage from "./FleetPage";
import { getAllFleetThunk } from "../../../actions/fleet-actions";
import { getConstantsThunk } from "../../../actions/constants-actions";

const FleetPageContainer = () => {
    const dispatch = useDispatch()
    const fleet = useSelector(state => state.fleet.fleet)
    const fleetMessage = useSelector(state => state.fleet.message)
    const vehicleTypes = useSelector(state => state.constants.vehicleTypes)
    const vehicleTypesError = useSelector(state => state.constants.error)

    useEffect(() => {
        dispatch(getAllFleetThunk())
        dispatch(getConstantsThunk('vehicleTypes'))
    }, [])

    return <>
        <FleetPage fleet={fleet} fleetMessage={fleetMessage} vehicleTypes={vehicleTypes} vehicleTypesError={vehicleTypesError}/>
    </>
}

export default FleetPageContainer;
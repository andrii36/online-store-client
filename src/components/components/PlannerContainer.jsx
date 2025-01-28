import { useDispatch, useSelector } from "react-redux"
import Planner from "./Planner"
import { updateUserThunk } from "../../actions/user-actions"

const PlannerContainer = () => {
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()

    const handleTaskUpdate = (updatedTasks) => {
        const user = {...currentUser, tasks: updatedTasks}
        dispatch(updateUserThunk(user))
    }

    return <Planner tasks={currentUser.tasks} updateTask={handleTaskUpdate}/>
}

export default PlannerContainer;
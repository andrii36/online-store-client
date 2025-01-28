import { useEffect } from "react";
import TeamPage from "./TeamPage"
import { getAllUsersThunk } from "../../../actions/team-actions";
import { useDispatch, useSelector } from "react-redux";

const TeamPageContainer = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.team.users)
    const error = useSelector(state => state.team.message)

    useEffect(() => {
        dispatch(getAllUsersThunk())
    }, [])

    return <>
        <TeamPage users={users} error={error}/>
    </>
}

export default TeamPageContainer;
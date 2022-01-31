import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import FilterArea from "./FilterArea"
import ContentHeaderContainer from "./ContentHeaderContainer"
import ContentListContainer from "./ContentListContainer"
import Pagination from "../Common/Pagination"
import { Navigate } from "react-router"

const Content = () => {

    const userRole = useSelector(state => state.auth.currentUser.role)
    const isAuthorised = useSelector(state => state.auth.isAuthorised)

    if(!isAuthorised){
        return <Navigate to='/login'/>
    }
    return(
        <Container>
            <FilterArea/>
            <ContentHeaderContainer role={userRole}/>
            <ContentListContainer/>
            <Pagination/>
        </Container>
    )
}
export default Content
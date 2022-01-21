import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import FilterArea from "./FilterArea"
import ContentHeaderContainer from "./ContentHeaderContainer"
import ContentListContainer from "./ContentListContainer"

const Content = () => {

    const userRole = useSelector(state => state.auth.currentUser.role)

    return(
        <Container>
            <FilterArea/>
            <ContentHeaderContainer role={userRole}/>
            <ContentListContainer/>
        </Container>
    )
}
export default Content
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { signupThunk } from "../../actions/user-actions"
import LoadingModal from "../Common/LoadingModal"
import SignupPage from "./SignupPage"

const SignupPageContainer = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state.auth)
    const isLoading = useSelector(state => state.auth.dataIsLoading)
    const navigate = useNavigate()

    useEffect(() => {
        if(selector.isAuthorised){
            navigate('/')
        } 
    }, [selector])

    const onFormSubmit = (data) => {
        dispatch(signupThunk(data))
    }
    return (
        <div>
            <SignupPage onFormSubmit={onFormSubmit} message={selector.message}/>
            {isLoading && <LoadingModal/>}
        </div>
    )
}
export default SignupPageContainer
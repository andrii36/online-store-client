import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { loginThunk } from "../../actions/auth-actions"
import LoginPage from './LoginPage'
import LoadingModal from "../Common/LoadingModal"

const LoginPageContainer = () => {
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
        dispatch(loginThunk(data))
    }
    return (
        <div>
            <LoginPage onFormSubmit={onFormSubmit} message={selector.message}/>
            {isLoading && <LoadingModal/>}
        </div>
    )
}
export default LoginPageContainer
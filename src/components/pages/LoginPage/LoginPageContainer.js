import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { loginThunk } from "../../../actions/user-actions"
import LoginPage from './LoginPage'
import LoadingModal from "../../Common/LoadingModal"

const LoginPageContainer = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if(user.isAuthorised){
            navigate('/dashboard')
        } 
    }, [user])

    const onFormSubmit = (data) => {
        dispatch(loginThunk(data))
    }
    return (
        <div>
            <LoginPage onFormSubmit={onFormSubmit} message={user.message}/>
            {user.isLoading && <LoadingModal/>}
        </div>
    )
}
export default LoginPageContainer
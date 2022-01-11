import { useEffect } from "react"
import { Form, Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { loginThunk } from "../../redux-store/auth-reducer"
import Loader from "../Common/Loader"
import Logo from "../Common/Logo"
import s from "./LoginPage.module.css"

const LoginPage = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state.auth)
    const isLoading = useSelector(state => state.auth.dataIsLoading)
    const navigate = useNavigate()

    useEffect(() => {
        if(selector.isAuthorised){
            navigate('/')
        } 
    }, [selector])

    const onFormSubmit = (e) => {
        e.preventDefault()
        dispatch(loginThunk({email: e.target[0].value, password: e.target[1].value}))
    }
    return (
        <div>
        <form onSubmit={onFormSubmit} className={s.login_form}>
            <Logo/>
            <div style={{color: 'red'}}>{selector.message}</div>
            <div>
                <Form.Group style={{color: "gray", width: "35%", margin: "0 auto"}}>
                    <Form.Label>Login</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="Login here" name="login"/>
                </Form.Group>
            </div>
            <div>
                <Form.Group style={{color: "gray", width: "35%", margin: "0 auto"}}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="Password here" name="password"/>
                </Form.Group>
            </div>
            <Button style={{marginTop: "25px"}} variant="outline-primary" type="submit">Login</Button>
        </form>
        {isLoading
        && <Modal size="sm" centered show={true} style={{textAlign: 'center'}}>
            <Modal.Header>
                <Modal.Title>Please wait</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Loader message='Loading...'/>
            </Modal.Body>
        </Modal>}
        </div>
    )
}
export default LoginPage
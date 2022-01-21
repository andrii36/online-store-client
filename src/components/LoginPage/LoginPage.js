import { Form, Button } from "react-bootstrap"
import Logo from "../Common/Logo"
import s from "./LoginPage.module.css"

const LoginPage = ({onFormSubmit, message}) => {
    
    return (
        <form onSubmit={onFormSubmit} className={s.login_form}>
            <Logo/>
            <div style={{color: 'red'}}>{message}</div>
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
    )
}
export default LoginPage
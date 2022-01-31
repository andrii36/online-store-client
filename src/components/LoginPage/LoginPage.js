import * as Yup from 'yup'
import { useFormik } from "formik"
import { Form, Button } from "react-bootstrap"
import Logo from "../Common/Logo"
import s from "./LoginPage.module.css"

const LoginPage = ({onFormSubmit, message}) => {
    const englishRegex = /^[A-Za-z0-9.@]+$/
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: onFormSubmit,

        validationSchema: Yup.object({
            email: Yup.string().matches(englishRegex, 'Only english letters')
            .min(3, 'Minimum length is 3 symbols').required('Required'),
            password: Yup.string().required('Required')
        })
    })

    return (
        <form onSubmit={formik.handleSubmit} className={s.login_form}>
            <Logo/>
            <div style={{color: 'red'}}>{message}</div>
            <div>
                <Form.Group style={{color: "gray", width: "35%", margin: "0 auto"}}>
                    <Form.Label>Login</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="Login here" name="email"
                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
                </Form.Group>
                {formik.touched.email && formik.errors.email ? <p style={{ color: "red" }}>{formik.errors.email}</p> : null}
            </div>
            <div>
                <Form.Group style={{color: "gray", width: "35%", margin: "0 auto"}}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="Password here" name="password"
                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
                </Form.Group>
                {formik.touched.password && formik.errors.password ? <p style={{ color: "red" }}>{formik.errors.password}</p> : null}
            </div>
            <Button disabled={!formik.touched.email || Object.keys(formik.errors).length !== 0}
                style={{margin: "20px 0"}} variant="outline-primary" type="submit"
            >
                Login
            </Button>
        </form>
    )
}
export default LoginPage
import { Form } from "react-bootstrap"

const InputText = ({label, id, placeholder, name, value, onChange, onBlur}) => {


    return(
        <Form.Group style={{color: "gray"}} controlId={id}>
            <Form.Label>{label}</Form.Label>
            <Form.Control name={name} value={value} onChange={onChange} size="sm" type="text" placeholder={placeholder} onBlur={onBlur}/>
        </Form.Group>
    )
}
export default InputText
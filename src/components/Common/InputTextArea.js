import { useState } from "react"
import { Form } from "react-bootstrap"

const InputTextArea = ({label, id, placeholder, name, value, onChange, onBlur}) => {

    return(
        <Form.Group style={{color: "gray"}} controlId={id}>
            <Form.Label>{label}</Form.Label>
            <textarea style={{width: "100%", maxHeight: "400px", minHeight: "330px"}} type="textarea" 
                      placeholder={placeholder} onChange={onChange} value={value} name={name} onBlur={onBlur}
            />
        </Form.Group>
    )
}
export default InputTextArea
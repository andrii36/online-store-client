import { Form } from "react-bootstrap"

const DropdownMenu = ({itemsArr, id, label, name, value, onChange}) => {

    const items = itemsArr.map((item, ind) => <option value={item} key={ind} >{item}</option>)

    return(
        <div>
            <label style={{color: "gray"}}>{label}</label>
            <Form.Select style={{marginTop: "8px"}} id={id} size="sm" 
                            name={name} onChange={onChange} value={value} title={value}
            >
                {items}
            </Form.Select>
        </div>
    )
}
export default DropdownMenu
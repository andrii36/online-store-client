import { useEffect } from "react"
import { Modal, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { clearMessageAndCode } from "../../actions/content-actions"
import { setEditItemSuccess } from "../../actions/modal-modes-actions"

const EditItemSuccessModal = ({updated, created}) => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        return () => {
            dispatch(clearMessageAndCode())
        }
    }, [])

    return (
        <Modal size="sm" centered show={true} style={{textAlign: 'center'}}>
            <Modal.Header>
                <Modal.Title style={{color: "green"}}>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{fontSize: "19px"}}>Product item was successfully {updated || created}</div>
                <Button style={{width: "100%"}} variant="outline-secondary" onClick={() => dispatch(setEditItemSuccess(false))}>Close</Button>
            </Modal.Body>
        </Modal>
    )
}

export default EditItemSuccessModal
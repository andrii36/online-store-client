import { Modal } from "react-bootstrap"
import Loader from "./Loader"

const LoadingModal = () => {
    return (
        <Modal size="sm" centered show={true} style={{textAlign: 'center'}}>
            <Modal.Header>
                <Modal.Title>Please wait</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Loader message='Loading...'/>
            </Modal.Body>
        </Modal>
    )
}

export default LoadingModal
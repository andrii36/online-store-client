import { Button, Modal } from "react-bootstrap"

const DeleteProductModal = ({handleClose, confirmDelete}) => {

    return(
        <>
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete this item?</Modal.Title>
                </Modal.Header>
                <Modal.Body>You will not be able to restore it if press "Yes"</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={confirmDelete}>
                        Yes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteProductModal
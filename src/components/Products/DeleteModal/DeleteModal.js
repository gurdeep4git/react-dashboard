import React from 'react'
import Modal from 'react-bootstrap/Modal';

const DeleteModal = (props) => {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="sm"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to delete product- #{props.productId}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <button type='button' className="btn btn-outline-danger me-3" onClick={props.onHide}>No</button>
                <button type='button' className="btn btn-primary" onClick={props.onDelete}>Yes</button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal
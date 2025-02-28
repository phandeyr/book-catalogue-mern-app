import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'

const DeleteModal = (props) => {
	return (
		<Modal
			show={props.show}
			onHide={props.onHide}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered >
			
			<ModalHeader closeButton>
				<ModalTitle id='contained-modal-title-vcenter'>
					Delete Book
				</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<p>Are you sure you want to delete this book?</p>
			</ModalBody>
			<ModalFooter>
				<Button onClick={props.onHide}>Cancel</Button>
				<Button onClick={props.delete}>Delete</Button>
			</ModalFooter>
		</Modal>
	)
}

export default DeleteModal

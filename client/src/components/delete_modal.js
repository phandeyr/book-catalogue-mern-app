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
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered 
			fade={false}>
			
			<ModalHeader closeButton>
				<ModalTitle id='contained-modal-title-vcenter'>
					Delete Record
				</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<p>Are you sure you want to delete this record?</p>
			</ModalBody>
			<ModalFooter>
				<Button onClick={props.onHide}>Cancel</Button>
				<Button onClick={props.delete}>Delete</Button>
			</ModalFooter>
		</Modal>
	)
}

export default DeleteModal

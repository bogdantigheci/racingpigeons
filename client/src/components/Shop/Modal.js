import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ModalDetails from './ModalDetails';
import { Link } from 'react-router-dom';

const ShopModal = (props) => {
  console.log('modal proooooops', props);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cart Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalDetails />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Continue</Button>
        <Link to="/user/cart">
          <Button>Checkout</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default ShopModal;

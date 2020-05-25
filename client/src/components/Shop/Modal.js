import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ModalDetails from './ModalDetails';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

const ShopModal = (props) => {
  const { t } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('Cart Details')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.prodauth || props.cardauth ? (
          <ModalDetails />
        ) : (
          <div>
            {t('You need to be')}
            <Link to="/register_login"> {t('logged in')}</Link>{' '}
            {t('before adding a pigeon to cart!')}
          </div>
        )}
      </Modal.Body>
      {props.prodauth || props.cardauth ? (
        <Modal.Footer>
          <Button onClick={props.onHide}>{t('Continue')}</Button>
          <Link to="/user/cart">
            <Button>{t('Checkout')}</Button>
          </Link>
        </Modal.Footer>
      ) : (
        <Modal.Footer>
          <div>
            {t('Do not have an account yet?')}
            <Link to="/register"> {t('Register!')}</Link>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default withNamespaces()(ShopModal);

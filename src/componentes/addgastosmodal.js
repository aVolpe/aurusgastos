import React, {Component} from 'react';

import {Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddGastosModal extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const [modalShow, setModalShow] = React.useState(false);
      
        return (
          <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Launch vertically centered modal
            </Button>
      
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </>
        );
      }
    }

    MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
              </Modal.Title>
              Agregar gastos al expediente
            </Modal.Header>
            <Modal.Body>
              <h4>Centered Modal</h4>
            <div className="container">
                Para agregar los datos
            </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }
      
      

}
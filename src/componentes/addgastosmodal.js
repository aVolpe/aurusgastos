import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

const API_GASTOS = 'http://localhost:8080/gastos/';


export class AddGastosModal extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
      event.preventDefault();

      let hoy = new Date();
      hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
      var min_date = hoy.toISOString()
      console.log (min_date);     
      
      var data = {
        id: null, 
        idExpediente: this.props.idExpediente, //   ----event.target.expediente.value,
        tipoGasto: event.target.tipoGasto.value,
        fecha: min_date,
        monto: event.target.monto.value,
        facturaNroStr: event.target.nroFactura.value,
        proveedor: event.target.proveedor.value,
        resposable: null
      };
      console.log(data);

      fetch(API_GASTOS,{
        method:'POST',
        headers: { 
          'Accept':'application/json',
          'Content-type':'application/json'
        },
        body:JSON.stringify(data)
      })
      .then(res => res.json())
      .catch(error => {console.error('Error:', error)})
      .then(response => {
        console.log('Success:', response)
        alert('Guarado');
        this.props.onClose();
      });
    }

    render(){
       let hoy = new Date();
       hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
       var min_date = hoy.toISOString().slice(0,10); 

        return (
          <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained_modal_title_vcenter">
                Agregar gastos al expediente {this.props.idExpediente}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col sm={6}>
                  <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="idExpediente">
                      <Form.Label>Expediente:</Form.Label>
                      <Form.Control
                        type="number"
                        name="expediente"
                        defaultValue={this.props.idExpediente}
                        required
                        placeholder="Expediente"
                      />
                    </Form.Group>
                    <Form.Group controlId="fechaGasto">
                      <Form.Label>Fecha:</Form.Label>
                      <Form.Control
                        type="date"
                        name="fecha"
                        defaultValue={min_date}
                        required
                        placeholder="Fecha"
                      />
                    </Form.Group>
                    <Form.Group controlId="monto">
                      <Form.Label>Monto:</Form.Label>
                      <Form.Control
                        type="number"
                        name="monto"
                        required
                        placeholder="Monto del gasto"
                      />
                    </Form.Group>
                    <Form.Group controlId="tipoGasto">
                      <Form.Label>Concepto:</Form.Label>
                      <Form.Control
                        type="text"
                        name="tipogasto"
                        maxLength="15"
                        required
                        placeholder="Tipo de gasto"
                      />
                    </Form.Group>
                    <Form.Group controlId="nroFactura">
                      <Form.Label>Nro. de Factura:</Form.Label>
                      <Form.Control
                        type="text"
                        name="nrofactura"
                        maxLength="15"
                        required
                        placeholder="Nro. de la Factura"
                      />
                    </Form.Group>
                    <Form.Group controlId="proveedor">
                      <Form.Label>Proveedor:</Form.Label>
                      <Form.Control
                        type="text"
                        name="proveedor"
                        maxLength="30"
                        required
                        placeholder="Proveedor del gasto"
                      />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">
                          Grabar
                        </Button>
                    </Form.Group>  
                  </Form>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.props.onHide}>Cerrar</Button>
            </Modal.Footer>
          </Modal>
        );
      }

    
      

}
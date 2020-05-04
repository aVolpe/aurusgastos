import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

const API_GASTOS = 'http://localhost:8080/gastos/';
const API_TIPO_GASTOS = 'http://localhost:8080/gastos/tipogastos';


export class AddGastosModal extends Component {
    constructor(props) {
        super(props);

        this.state = {tipoGastos:[], tipoGasto: 0, snackbarOpen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTipoChange = this.handleTipoChange.bind (this);
    }

    componentDidMount(){
      fetch (API_TIPO_GASTOS)
      .then(response=> response.json() )
      .then(data => {this.setState ({tipoGastos: data })}) 

    }
    
    snackbarClose = (event)  => {
      this.setState ( {snackbarOpen: false});
    }

    handleTipoChange(event){
      this.setState({tipoGasto: event.target.value});
      console.log('Tipo Gasto', event.target.value);
      console.log('Tipo Gasto', event.target);
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
        tipoGasto: event.target.tipoGasto.value.toString().split('-'),
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
        
        this.setState({snackbarOpen:true, snackbarmsg:'El registro se guardó correctamente'});
        
        this.props.onClose();
      });
    }

    render(){
       let hoy = new Date();
       
       hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
       var min_date = hoy.toISOString().slice(0,10); 

        return (
          <div className="container">
            <Snackbar 
              anchorOrigin={{vertical:'top', horizontal:'center'}}
              open = {this.state.snackbarOpen}
              autoHideDuration = {3000}
              onClose={this.snackbarClose}
              message = {<span id="message-id">{this.state.snackbarmsg}</span>}
              action={[
                <IconButton 
                  key="close" 
                  arial-label="Cerrar" 
                  color ="inherit"
                  onClick={this.snackbarClose}>
                    x
                  </IconButton>
              ]}
            />
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
                      <Form.Group controlId="fechaGasto">
                        <Form.Label>Fecha:</Form.Label>
                        <Form.Control
                          type="date"
                          name="fecha"
                          defaultValue={min_date}
                          required
                          placeholder="Fecha del gasto"
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
                        <Form.Control as="select" onChange={this.handleTipoChange}>
                          {this.state.tipoGastos.map (tp =>
                            <option value={tp.codtipo}
                            >
                              {tp.codtipo} - {tp.Descrip}
                              
                            </option>
                          )}
                        </Form.Control>
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
          </div>
        );
    }
}
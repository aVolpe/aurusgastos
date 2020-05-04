import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
//import { IntlMixin, FormattedDate, FormattedNumber, } from 'react-intl';

//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

const API_GASTOS = 'http://localhost:8080/gastos/';
const API_TIPO_GASTOS = 'http://localhost:8080/gastos/tipogastos';


export class EditGastosModal extends Component {
    constructor(props) {
        super(props);

        
        this.state = {tipoGastos:[],snackbarOpen: false, snackbarmsg: '', fechaGasto: (new Date (this.props.fecha)).setHours(0,0,0) };
    
        this.handleDateChange = this.handleDateChange.bind(this);
        this.render = this.render.bind(this);
    }

    componentDidMount(){
        fetch (API_TIPO_GASTOS)
        .then(response=> response.json() )
        .then(data => {this.setState ({tipoGastos: data })}) 
  
    }

    snackbarClose = (event)  => {
        this.setState ( {snackbarOpen: false});
    }

    handleDateChange(date) {
        console.log('Date ', date);
        this.setState({
          fechaGasto: date
        })
      }
    handleSubmit(event){
        event.preventDefault();
  
        
        var data = {
          id: event.target.identificador.value, 
          idExpediente: this.props.idExpediente, //   ----event.target.expediente.value,
          tipoGasto: event.target.tipoGasto.value, 
          fecha: this.state.fechaGasto,
          monto: event.target.monto.value,
          facturaNroStr: event.target.nroFactura.value,
          proveedor: event.target.proveedor.value,
          resposable: null
        };
        console.log(data);
  
        fetch(API_GASTOS,{
          method:'PUT',
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
                    Actualizar gastos al expediente {this.props.idExpediente}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="identificador">
                            <Form.Label>Identificador:</Form.Label>
                            <Form.Control
                            type="number"
                            name="identificador"
                            defaultValue={this.props.identificador}
                            required
                            disabled
                            placeholder="Identificador"
                            />
                        </Form.Group>
                        <Form.Group controlId="fechaGasto">
                            <Form.Label>Fecha:</Form.Label>
                            <Form.Control
                                type="date"
                                name="fecha"
                                defaultValue={this.props.fecha}
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
                            defaultValue={this.props.monto}
                            placeholder="Monto del gasto"
                            />
                        </Form.Group>
                        <Form.Group controlId="tipoGasto">
                            <Form.Label>Concepto: {this.props.tipoGasto} </Form.Label>
                            <Form.Control as="select" defaultValue={this.props.tipoGasto} value={this.props.tipoGasto}>
                             {this.state.tipoGastos.map (tp =>
                                <option value={tp.codtipo} key={tp.codtipo}>
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
                            defaultValue={this.props.facturanrostr}
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
                            defaultValue={this.props.proveedor}
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

import React, {Component} from 'react';
import {Table, Button, ButtonToolbar} from 'react-bootstrap';
import { Router, Route, Switch, Link } from "react-router-dom";
import { IntlMixin, FormattedDate, FormattedNumber, } from 'react-intl';
import {AddGastosModal} from './addgastosmodal';

const API_GASTOS = 'http://localhost:8080/gastos/exp/';


export class Gasto extends Component {
    
    constructor(props) {
        super (props);
        console.log ('constructor');
    
        this.state={
            gastos: [],
            isLoading: true,
            error: null,
            addModalShow: false,
            id: props.match.params.id
        }
    }

    componentDidMount () {
            console.log(" estoy en gastos ComponentDidMount! ");
            console.log("Expediente: ", JSON.stringify(this.props, null, 2));
            this.refreshList();
            
    }

    refreshList() {
        console.log(API_GASTOS + this.state.id);
        fetch (API_GASTOS + this.state.id)
          .then(response=>  {
              if ( response.ok ) {
                  return response.json();
              } else {
                  throw new Error('Error al recuperar los datos de la API REST...');
              }
              })
          .then(data => {this.setState ({gastos: data, isLoading: false })})
          .catch(error => this.setState({error, isLoading: false}));
            
    }        
 
    render () {
        const {gastos, isLoading, error} = this.state; 
        let addModalClose =() => this.setState({addModalShow: false});

        // Sumamos el total de gastos actual
        // usamos 'reduce' para recorrer la lista de gastos y acumular
        //
        console.log ('render');
        let gastoIni = gastos[0];
        let TotalGastos = gastos.reduce((total, gasto) => {
                total += gasto.monto; 
                
                return total; }, 0) 
        if ( error ) {
            console.log ('error en el render');
            return (
            <p>Se produjo un error. {error.message}</p>
            );
        }
        if ( isLoading ) {
            return (<p>Cargando datos...</p>) ;
        }
        return (
            
            <div className="container">
                 <div className='mt-4'>
                    <p>
                        Causa: {gastoIni.caratula}
                    </p>
                    Total de Gastos a la Fecha:   <FormattedNumber value={TotalGastos} /> 
                </div>
                
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Monto</th>
                        <th>Concepto</th>
                        <th>Nro. Factura</th>
                        <th>Proveedor</th>
                        <th>Acciones</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {gastos.map(gasto => (
                        
                        <tr key={gasto.identificador}>
                        <td align="right">{
                            <FormattedDate
                            value={gasto.fecha}
                            day="numeric"
                            month="numeric"
                            year="numeric"
                            />
                        }</td>
                        <td>{
                            <FormattedNumber value={gasto.monto} />
                            }
                        </td>
                        <td>{gasto.TipoGasto_Descrip}</td>
                        <td>{gasto.facturanrostr}</td>
                        <td>{gasto.proveedor}</td>
                        <td>
                            Editar
                        </td>   
                        </tr>
                        
                    ))}
                    </tbody>                    
                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick= {()=> this.setState({addModalShow: true})}
                    >
                        Agregar Gastos 
                    </Button> 
                    <AddGastosModal idExpediente={this.state.id}
                      show={this.state.addModalShow}
                      onClose={() => { 
                          this.setState({ addModalShow: false });
                          this.refreshList();
                        }}
                      onHide={addModalClose}
                    />
                </ButtonToolbar>
            </div>
           
        );
    }
}
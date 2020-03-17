import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import { Router, Route, Switch, Link } from "react-router-dom";
import { IntlMixin, FormattedDate, FormattedNumber, } from 'react-intl';

const API_GASTOS = 'http://localhost:8080/gastos/exp/';
const DEFAULT_QUERY = '21';


export class Gasto extends Component {
    

    constructor(props) {
        super (props);
    
        this.state={
            gastos: [],
            idExpediente: this.props.location.state.idExpediente,
            isLoading: false,
            error: null,
        }
    }

    componentDidMount () {
       
        console.log("ComponentDidMount! ");
        
        console.log("Expediente: ", this.props.location.state.idExpediente);
        this.setState ( {isLoading: true});
        this.setState ( {idExpediente: this.props.location.state.idExpediente});

        this.refeshList();
    }

    refeshList() {
        console.log(API_GASTOS + this.props.location.state.idExpediente);
        fetch (API_GASTOS + this.props.location.state.idExpediente)
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
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        console.log(this.props);

        // Sumamos el total de gastos actual
        // usamos 'reduce' para recorrer la lista de gastos y acumular
        //
        let TotalGastos = gastos.reduce((total, gasto) => {
                total += gasto.monto; 
                console.log("monto = ", gasto.monto) ;
                console.log("total = ", total) ;
                
                return total; }, 0) 
        if ( error ) {
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
                    Total de Gastos a la Fecha:   <FormattedNumber value={TotalGastos} /> 
                </div>
                
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Causa</th>
                        <th>Fecha</th>
                        <th>Monto</th>
                        <th>Gasto</th>
                        <th>Nro. Factura</th>
                        <th>Proveedor</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {gastos.map(gasto => (
                        
                        <tr key={gasto.identificador}>
                        <td>{gasto.caratula}</td>
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
                  
                        </tr>
                        
                    ))}
                    </tbody>                    
                </Table>
            </div>
        );
    }
}
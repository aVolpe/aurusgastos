import React, {Component} from 'react';
import {Table} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import {Gasto} from './gastos';
import { Link, useHistory } from 'react-router-dom';


const API_ABOGADOS = 'http://localhost:8080/abogados/01/expedientes';
const API_GASTOS = 'http://localhost:8080/gastos/exp/';


export class Expediente extends Component {
    constructor (props) {
        super (props);
        //'exps' es un array donde esperamos tener los detalles de los expedientes
        this.state={
            exps: [],
            isLoading: false,
            error: null,

        };
    } 

    componentDidMount(){
        this.setState ( {isLoading: true});

        this.refreshList();
        
    }
    refreshList() {
        fetch (API_ABOGADOS)
          .then(response=>  {
              if ( response.ok ) {
                  return response.json();
              } else {
                  throw new Error('Error al recuperar los datos de la API REST...');
              }
              })
          .then(data => {this.setState ({exps: data, isLoading: false })})
          .catch(error => this.setState({error, isLoading: false}));
            
    }
    render () {
        const {exps, isLoading, error} = this.state; 
        if ( error ) {
            return (
               <p>Se produjo un error. {error.message}</p>
            );
        }
        if ( isLoading ) {
            return (<p>Cargando datos...</p>) ;
        }
        return (
          <Table className="mt-4" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Nro. Expediente</th>
                <th>Juzgado</th>
                <th>Turno</th>
                <th>Secretaria</th>
                <th>Ciudad</th>
                <th>Estado</th>
                <th>Causa</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {exps.map(expediente => (
                <tr key={expediente.identificador}>
                  <td>{expediente.nroExpediente}</td>
                  <td>{expediente.Juzgado_Descrip}</td>
                  <td>{expediente.Turno_Descrip}</td>
                  <td>{expediente.Secretaria_Descrip}</td>
                  <td>{expediente.Ciudad_Descrip}</td>
                  <td>{expediente.Estado_Descrip}</td>
                  <td>{expediente.caratula}</td>
                  <td>
                      <Link to="/gastos">Gastos</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
    }
}
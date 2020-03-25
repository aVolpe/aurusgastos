import React, {Component} from 'react';
import {Table} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom';
import history from '../utils/history';

const API_ABOGADOS = 'http://localhost:8080/abogados/21/expedientes';


export class Expediente extends Component {
    constructor (props) {
        super (props);
        //'exps' es un array donde esperamos tener los detalles de los expedientes
        this.state={
            exps: [],
            isLoading: false,
            error: null,
        };
        // Este enlace es necesario para hacer que `this` funcione en el callback
        this.handleClick = this.handleClick.bind(this);
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

    handleClick (e) {
       const idExpediente = e.target.dataset.id;
       console.log("Aqui debe ir a gastos", idExpediente);
       this.props.history.push(`/expedientes/${idExpediente}/gastos`);
            
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
                    <button type="button" data-id={expediente.identificador}
                       onClick={this.handleClick}> 
                        Gastos
                        {expediente.identificador}

                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
    }
}
import React, {Component} from 'react';
import { getUser, getUserName, removeUserSession } from '../utils/commons';

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state={
            isLoading: true,
            error: null,
            codAbogado: '',
            razonSocial: '',
            abogado: ''
        }
        console.log('HOME - constructor', this.state.abogado);
    }
    render () {
        const user = getUser();
        const userName = getUserName();

        return (
            <div className="mt-5 dflex justify-content-left">
                <h3>Bienvenido {userName} al portal de Gastos Jurídicos.
                    Esta es la página principal.
                    
                </h3>
                
            </div>    
        )
    }
}
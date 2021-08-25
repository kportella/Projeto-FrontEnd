import React from 'react'
import BarraDeNavegacao from "../../components/BarraDeNavegacao";
import './ConsultarProposta.css'

export default function ConsultarProposta() {

    return (
        <div>
            <div>
                <BarraDeNavegacao></BarraDeNavegacao>
            </div>

            <div className='consulta-container'>
                <form>
                    <label>CPF do Cliente</label>
                    <input type='text' name='cpf' id='cpf' value='teste' />
                    <button>Consultar CPF</button>
                </form>
                <button>Consultar todas as propostas</button>
            </div>
        </div>
    );
}



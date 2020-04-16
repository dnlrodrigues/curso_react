import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from  '../../assets/logo.svg';

export default function Profile (){
    const [incidents, setIncidents] = useState([]); 

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');    

    const history = useHistory();

    const getList = function () {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        })
        .then(response => {
            setIncidents(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }

    useEffect( () => {
        getList();
    }, [ongId]);

    function handleDeleteIncident(id){
        api.delete(`incidents/${id}`, { 
            headers : {
                Authorization : ongId
            }
        })
            .then( reponse => {
                console.log('response status delete: ' + reponse.status);
                alert('Deletou \\o/');
                getList();
            })
            .catch( error => {
                alert('Erro ao excluir registro');
            });
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span> Bem Vinda, {ongName} </span>

                <Link className="button" to="/incidents/new"> Cadastrar Novo Caso </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1> Casos cadastrados </h1>
            <ul>
               
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong> CASO: </strong>
                        <p> {incident.title} </p>

                        <strong> DESCRIÇÃO: </strong>
                        <p> {incident.description} </p>

                        <strong> VALOR: </strong>
                        <p> R$ {Intl.NumberFormat('pt-BR', { style: 'currency', currency:  'BRL'}).format(incident.value)} </p>

                        <button type="button" onClick = { () => handleDeleteIncident(incident.id) } > 
                            <FiTrash size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ) )}
               
            </ul>
        </div>
    );
}

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import './styles.css';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    function handleNewIncident(e) {
        e.preventDefault();

        const data = [ title, description, value];

        api.post('incidents', data, {
            headers : {
                Authorization: ongId
            }
        })
            .then(() => {
                alert('Incident salvo com sucesso');
                history.push('/profile');
            })
            .catch(error => {
                alert('Erro ao salvar novo incident');
            })
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1> Cadastrar novo caso </h1>
                    <p> Descreva o caso detalhadamente para encontrar um herói para resolver isso. </p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E020401" />
                        Voltar para home
                    </Link>
                </section>
                <form action="">
                    <input type="text" placeholder="Título do caso" value={title} onChange={ e => setTitle(e.target.value)}/>
                    <textarea type="text" placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    <input type="text" placeholder="Valor em reais" value={value} onChange={e => setValue(e.target.value)}/>
                    <button type="submit" className="button" onClick={handleNewIncident}> Cadastrar </button>
                </form>
            </div>
        </div>
    );
}

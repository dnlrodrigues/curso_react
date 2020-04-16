import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png';

import api from '../../services/api';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        api.post('sessions', { id } )
        .then((response) =>{        
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.resp.name);

            history.push('/profile');
        })
        .catch((error) => {
            console.error("err: "+error);
            alert('Falha no login');
        });
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1> Faça seu logon </h1>
                    <input type="text" placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)} /> 
                    <button className="button" type="submit"> Entrar </button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tem cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
        
    );
}
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {

  const history = useHistory();

  const [id, setId] = useState('');

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await api.post('session', { id });
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile');
    } catch (err) {
      alert('ID inválida, tente novamente');
    }

  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Be the hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input placeholder="Sua ID" value={id} onChange={event => setId(event.target.value)} />
          <button type="submit" className='button'>Entrar</button>

          <Link className='back-link' to="/register">
            <FiLogIn size={16} color='#e02041' />
            Não tenho cadastro
          </Link>
        </form>

      </section>
      <img src={heroesImg} alt="heroes" />
    </div>
  );
}

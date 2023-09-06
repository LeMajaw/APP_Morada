import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';
import logoCadastro from '../../assets/cadastro.png';
import { BiLogOut } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function Moradas() {
  const [searchInput, setSearchInput] = useState('');

  const [filtro, setFiltro] = useState([]);

  const [moradas, setMoradas] = useState([]);

  const email = localStorage.getItem('email');

  const token = localStorage.getItem('token');

  const history = useHistory();

  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const searchMoradas = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const dadosFiltrados = moradas.filter((item) => {
        return Object.values(item).join('').toLowerCase()
          .includes(searchInput.toLowerCase())
      });
      setFiltro(dadosFiltrados);
    }
    else {
      setFiltro(moradas);
    }
  }

  useEffect(() => {
    api.get('api/morada', authorization).then(
      response => {
        setMoradas(response.data);
      }, token)
  })

  async function logout() {
    try {
      localStorage.clear();
      localStorage.setItem('token', '');
      authorization.headers = '';
      history.push('/');
    } catch (err) {
      alert('Não foi possível fazer o logout' + err);
    }
  }

  async function editMorada(id) {
    try {
      history.push(`morada/nova/${id}`);
    } catch (error) {
      alert('Não foi possível editar a morada')
    }
  }

  async function deleteMorada(id) {
    try {
      if (window.confirm('Deseja deletar a morada de id = ' + id + ' ?')) {
        await api.delete(`api/morada/${id}`, authorization);
        setMoradas(moradas.filter(morada => morada.id !== id));
      }
    } catch (error) {
      alert('Não foi possível excluir o aluno')
    }
  }

  return (
    <div className="morada-container">
      <header>
        <img src={logoCadastro} alt="Cadastro" />
        <span>Bem-Vindo, <strong>{email}</strong>!</span>
        <Link className="button" to="morada/nova/0">Nova Morada</Link>

        {/* <button onClick={logout} type="button" style={{ border: 0, padding: 0 }}> */}
        <button onClick={logout} type="button">
          <BiLogOut size={35} color="#d22e2e" />
        </button>
      </header>

      <form>
        <input type='text'
          placeholder='Filtrar'
          onChange={(e) => searchMoradas(e.target.value)}
        />
      </form>

      <h1>Moradas Cadastradas</h1>
      {searchInput.length > 1 ? (
        <ul className='vertical-list'>
          {filtro.map(morada => (
            <li key={morada.Id}>
              <div className="itens-container">
                <b>Morada: </b>{morada.morada}<br /><br />
                <b>Código Postal: </b>{morada.codigoPostal}<br /><br />
                <b>Rua: </b>{morada.rua}<br /><br />
                <b>Freguesia: </b>{morada.freguesia}<br /><br />
                <b>Concelho: </b>{morada.concelho}<br /><br />
                <b>Distrito: </b>{morada.distrito}<br /><br />
                <b>País: </b>{morada.pais}<br /><br />
              </div>
              <button onClick={() => editMorada(morada.id)} type="button">
                <FiEdit size="25" color="#4682b4" />
              </button>
              <button type="button" onClick={() => deleteMorada(morada.id)}>
                <RiDeleteBin6Line size="25" color="#b81414" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {moradas.map(morada => (
            <li key={morada.id}>
              <div className="itens-container">
                <b>Morada: </b>{morada.morada}<br /><br />
                <b>Código Postal: </b>{morada.codigoPostal}<br /><br />
                <b>Rua: </b>{morada.rua}<br /><br />
                <b>Freguesia: </b>{morada.freguesia}<br /><br />
                <b>Concelho: </b>{morada.concelho}<br /><br />
                <b>Distrito: </b>{morada.distrito}<br /><br />
                <b>País: </b>{morada.pais}<br /><br />
              </div>

              <button onClick={() => editMorada(morada.id)} type="button">
                <FiEdit size="25" color="#4682b4" />
              </button>
              <button type="button" onClick={() => deleteMorada(morada.id)}>
                <RiDeleteBin6Line size="25" color="#b81414" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
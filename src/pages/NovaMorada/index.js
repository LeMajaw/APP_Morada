import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link, useHistory, useParams } from 'react-router-dom';
import { GrReturn } from 'react-icons/gr';
import { BsHouseAdd } from 'react-icons/bs';
import api from '../../services/api';

export default function NovaMorada() {
   const [id, setId] = useState(null);

   const [morada, setMorada] = useState('');

   const [codigoPostal, setCodigoPostal] = useState('');

   const [rua, setRua] = useState('');

   const [freguesia, setFreguesia] = useState('');

   const [concelho, setConcelho] = useState('');

   const [distrito, setDistrito] = useState('');

   const [pais, setPais] = useState('');

   const { moradaId } = useParams();

   const history = useHistory();

   const token = localStorage.getItem('token');

   const authorization = {
      headers: {
         Authorization: `Bearer ${token}`
      }
   }

   useEffect(() => {
      if (moradaId === '0')
         return;
      else
         loadMorada();
   }, moradaId)

   async function loadMorada() {
      try {
         const response = await api.get(`api/morada/${moradaId}`, authorization);

         setId(response.data.id);
         setMorada(response.data.morada);
         setCodigoPostal(response.data.codigoPostal);
         setRua(response.data.rua);
         setFreguesia(response.data.freguesia);
         setConcelho(response.data.concelho);
         setDistrito(response.data.distrito);
         setPais(response.data.pais);
      } catch (error) {
         alert('Erro ao recuperar a morada ' + error);
         history.push('/moradas');
      }
   }

   async function saveOrUpdate(event) {
      event.preventDefault();

      const data = {
         morada,
         codigoPostal,
         rua,
         freguesia,
         concelho,
         distrito,
         pais,
      }

      try {
         if (moradaId === '0') {
            await api.post('api/morada', data, authorization);
         }
         else {
            data.id = id;
            await api.put(`api/morada/${id}`, data, authorization)
         }
      } catch (error) {
         alert('Erro ao gravar morada ' + error);
      }
      history.push('/moradas');
   }

   return (
      <div className="nova-morada-container">
         <div className="content">
            <section className="form">
               <div id='icon-add-morada'>
                  <BsHouseAdd size="300" color="#17202a" />
               </div>
               <h1>{moradaId === '0' ? 'Incluir Nova Morada' : 'Atualizar Morada'}</h1>
               <Link id='big-screen-back-button' className="back-link" to="/moradas"  style={{display: "block"}}>
                  <div className="button-retorno">
                     <GrReturn size={50} style={{ marginTop: 10 }} />
                  </div>
               </Link>
            </section>

            <form onSubmit={saveOrUpdate}>
               <input placeholder="Morada"
                  value={morada}
                  onChange={e => setMorada(e.target.value)}
               />
               <input placeholder="Código Postal"
                  value={codigoPostal}
                  onChange={e => setCodigoPostal(e.target.value)}
               />
               <input placeholder="Rua"
                  value={rua}
                  onChange={e => setRua(e.target.value)}
               />
               <input placeholder="Freguesia"
                  value={freguesia}
                  onChange={e => setFreguesia(e.target.value)}
               />
               <input placeholder="Concelho"
                  value={concelho}
                  onChange={e => setConcelho(e.target.value)}
               />
               <input placeholder="Distrito"
                  value={distrito}
                  onChange={e => setDistrito(e.target.value)}
               />
               <input placeholder="País"
                  value={pais}
                  onChange={e => setPais(e.target.value)}
               />
               <button className="button" type="submit">{moradaId === '0' ? 'Incluir ' : 'Atualizar '}</button>
            </form>
            <Link id='small-screen-back-button' className="back-link" to="/moradas" style={{display: "none"}}>
               <div className="button-retorno">
                  <GrReturn size={50} style={{ marginTop: 10 }} />
               </div>
            </Link>
         </div>
      </div>
   );
}
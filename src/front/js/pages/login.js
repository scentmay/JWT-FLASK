import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState ("");
  const [password, setPassword] = useState ("");
  let navigate = useNavigate();

  //Función para limpiar el token del store
  const logOut = () => {
    actions.cleanStore();
  }

  const handleClick = () => {
   actions.login(email, password);
  };

  //Una vez logado, si es correcto el token, nos lleva a nuestra página privada
  if(store.user.token && store.user.token != "" && store.user.token != undefined) { navigate("/private") }

  return (
    <div className="text-center mt-5">
      <h1>Estás en la página de Login</h1>
        {
          (store.user.token && store.user.token != "" && store.user.token != undefined) ?
           ( 
           <div>
            <p>Estas logado con el token: {store.user.token}</p>
            <Link to={'/'} className="btn btn-primary btn-lg mt-3 ms-3" onClick={logOut}>Log out</Link>
            <Link to={'/private'} className="btn btn-primary btn-lg mt-3 ms-3">Página privada</Link>
           </div>
           ) :
           ( 
          <div>
            <input type="text" className="inputs" placeholder="email" value={email} onChange={(e) => {
              setEmail(e.target.value)
            }} />
            <input type="text" placeholder="password" value={password} onChange={(e) => {
              setPassword(e.target.value)
            }} />
            <button onClick={handleClick}>Login</button>
            <div>
              <Link to={'/signup'} className="btn btn-primary btn-lg mt-3 ms-3">Registro</Link>
            </div>
          </div>
          )
        }
      
      
    </div>
  );
};

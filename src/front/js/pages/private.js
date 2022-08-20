import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const Private = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  const redirigir = () => {
    // console.log("Entrando aquí...")
    setTimeout(()=>{
      navigate("/")
    }, 5000)
  }

  //ejemplo de fetch q sólo se lleva a cabo si hay token, es decir, el usuario se ha identificado
  useEffect(() => {
    if (store.user.token && store.user.token !="" && store.user.token != undefined) actions.getMessage();
  },[store.user.token]);

  return (
    <div className="text-center mt-5">
      {
        (store.user.token && store.user.token != "" && store.user.token != undefined) ? 
          (
            <div>
              <h1 className="text-center">Bienvenido a la tu página privada</h1>
              <p>Estas logado con el token: {store.user.token}</p>
              <p>mensaje del backend: {store.message}</p>
              <Link to={'/'} className="btn btn-primary btn-lg mt-3 ms-3">Ir a página de login</Link>
            </div>
          )
        :
         (
          <div>
            <h1 className="text-center">Usuario no registrado</h1>
            <p>Será redirigido a la página de login en 5 segundos</p>
            {redirigir()}
          </div>
         )
      }
    </div>
  );
}

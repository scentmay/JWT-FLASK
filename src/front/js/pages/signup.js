import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState ("");
	const [password, setPassword] = useState ("");
	let navigate = useNavigate();

	
	const handleClick = () => {
		actions.register(email, password);
		//una vez registrado, redirigimos al usuario a la página de login
		alert("Registrado con éxito con el mail " + email + ", será redirigido a la página de login");
		navigate("/");
	}

	return (
		<div className="container text-center mt-5">
			<h1>Estás en la página de Registro</h1>
            <input type="text" className="inputs" placeholder="email" value={email} onChange={(e) => {
              setEmail(e.target.value);
			  
            }} />
            <input type="text" placeholder="password" value={password} onChange={(e) => {
              setPassword(e.target.value);
			  
            }} />
            <button onClick={handleClick}>Registro</button>
            <div>
              <Link to={'/'} className="btn btn-primary btn-lg mt-3 ms-3">Volver</Link>
            </div>
 
		</div>
	);
};
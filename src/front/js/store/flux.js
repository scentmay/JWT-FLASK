const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: {
				"email": "",
				"token": ""
				},
			logged: false,
			flag: false,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {

			cleanStore: () => {
				//Eliminamos token de la store y de la sesión del navegador
				console.log("Limpiando store...");
				setStore({user: {"email": "","token": ""}});
				sessionStorage.removeItem("token");
				setStore({logged: false});
			},

			register:  async (email, password) => {

				const store = getStore();

				const opts = {
					method: 'POST',
					headers: {
					  "Content-Type": "application/json"
					},
					body: JSON.stringify({
					  "email": email,
					  "password": password
					})
				  };

				await fetch( process.env.BACKEND_URL + "/api/register", opts)

				.then ((res) => {
					if (!res.ok) {
						alert("Ha ocurrido un error en el primer paso del fetch, vuelva a intentarlo");
						setStore({flag: false})
						return;
					}
					else {
						setStore({flag: true})
						return res.json();
					}
				})
				.then((data) => {
					//console.log("Usuario creado (mensaje del front) " + data);
					if (store.flag) {
						console.log("Registrado con éxito")
						//una vez registrado, redirigimos al usuario a la página de login
						alert("Registrado con éxito con el mail " + email + ", será redirigido a la página de login");
						setStore({flag: false})
					}
					 
				})
				.catch((error) => {
					console.error("Ha ocurrido un error " + error);
				})
			},
			

			login: async (email, password) => {

				const opts = {
					method: 'POST',
					headers: {
					  "Content-Type": "application/json"
					},
					body: JSON.stringify({
					  "email": email,
					  "password": password
					})
				  };

				await fetch(process.env.BACKEND_URL + "/api/login", opts)
				.then((res)=> {
						if (!res.ok) {
							alert("Credenciales incorrectas");
							return false;
						}
						return res.json();
					})
				.then((data) => {
					console.log("this came from the backend", data)
					const store = getStore();
					setStore({user: data})
					setStore({logged: true})
					// //almacenamos el token en la sesión del navegador
					sessionStorage.setItem("token", data.token)
					return true;
				})
				
				.catch((error) => {
						console.error("Ha ocurrido un error " + error);
						
				})
			},


			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;

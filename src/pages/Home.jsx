import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import CardsPersonajes from "../components/CardsPersonajes.jsx";
import Planets from "../components/Planets.jsx";
import Vehicles from "../components/Vehicles.jsx";
import React, {useEffect} from "react";



export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	function cartasPersonajes(){
    fetch("https://www.swapi.tech/api/people/")
        .then(response => response.json())
        .then(async (data) => {
            const personajesDetalles = await Promise.all(
                data.results.map(personaje =>
                    fetch(personaje.url)
                        .then(res => res.json())
                        .then(data => 
                           ({...data.result.properties, uid: data.result.uid})
                        )))

            dispatch({
                type: "set_personajes",
                payload: { personaje: personajesDetalles }
            });
        })
        .catch(err => console.error(err));
}

function cartasPlanetas(){
    fetch("https://www.swapi.tech/api/planets/")
        .then(response => response.json())
        .then(async (data) => {
            const planetasDetalles = await Promise.all(
                data.results.map(planeta =>
                    fetch(planeta.url)
                        .then(res => res.json())
                        .then(data => 
                           ({...data.result.properties, uid: data.result.uid})
                        )))
            dispatch({
                type: "set_planetas",
                payload: { planetas: planetasDetalles }
            });
        })
        .catch(err => console.error(err));
}

function cartasVehiculos(){
    fetch("https://www.swapi.tech/api/vehicles/")
        .then(response => response.json())
        .then(async (data) => {
            const vehiculosDetalles = await Promise.all(
                data.results.map(vehiculoStar =>
                    fetch(vehiculoStar.url)
                        .then(res => res.json())
                        .then(data => 
                           ({...data.result.properties, uid: data.result.uid})
                        )))
            dispatch({
                type: "set_vehicles",
                payload: { vehiculos: vehiculosDetalles }
            });
        })
        .catch(err => console.error(err));
}


	useEffect(()=>{
		cartasPersonajes(),
		cartasPlanetas(),
        cartasVehiculos()
	}, [])


	return (
		<div className="Container">
		<div className="carta m-2">
			<h1 className="título ms-5" style={{color: "rgba(255, 219, 88, 1)"}}>PERSONAJES</h1>
			
			<div className="d-flex ">
				{store.character.map((value,index)=> {
					return(
                        <CardsPersonajes key={index} people={value} />
                        
						
					)
				})}
			</div>	
        </div>
		    
		<div className="planetasStar">
				<h1 className="título ms-5" style={{color: "rgba(255, 219, 88, 1)"}}>PLANETAS</h1>
				<div className="d-flex ">
				{store.planets.map((value,index)=> {
					return(
                        <Planets key={index} planetas={value}/>
						
					)
				})}
			    </div>
			
		</div>

         <div className="vehiculos m-2">
			<h1 className="título ms-5" style={{color: "rgba(255, 219, 88, 1)"}}>VEHÍCULOS</h1>
			
			<div className="d-flex ">
				{store.vehicles.map((value,index)=> {
					return(
                        <Vehicles key={index} vehiculo={value} />
						
					)
				})}
			</div>	
        </div> 
		</div>
	);
}; 
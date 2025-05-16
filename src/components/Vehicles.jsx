import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


const Vehicles = ({ vehiculo }) => {
	const navigate = useNavigate()
	const { store, dispatch } = useGlobalReducer()

	const isFavorite = store.favorites?.some(fav => fav === vehiculo.name)

	const favorite = () => {
		if (isFavorite === true) {
			const action = {
				type: "removeFavorite",
				payload: vehiculo.name
			}
			dispatch(action)
		} else {
			const action = {
				type: "newFavorite",
				payload: vehiculo.name
			}
			dispatch(action)
		}
	}

	return (
		<div className="carta m-5">
			<div className="card" style={{ backgroundColor: "white", width: "18rem" }}>
				<img src="https://i.blogs.es/e8942b/millennium-falcon/450_1000.jpg" className="card-img-top" alt="" style={{ height: "300px" }} />
				<div className="card-body">
					<h5 className="card-title">{vehiculo.name}</h5>
					<p className="card-text" style={{ color: "black" }}>
						<ul>
							<li><b>Modelo:</b> {vehiculo.model}</li>
							<li><b>Manufactura:</b> {vehiculo.manufacturer}</li>
						</ul>
					</p>
					<div className="d-flex justify-content-between">
						<button type="button" className="btn btn-dark" onClick={() => { navigate(`/descripción/vehiculo/${vehiculo.uid}`) }}>Learn More</button>
						<button type="button" className="btn btn-dark" onClick={favorite}>
							<i className={isFavorite ? "bi bi-heart-fill" : "bi bi-heart"}
								style={{ color: isFavorite ? "Yellow" : "white" }}
							></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
};

export default Vehicles;

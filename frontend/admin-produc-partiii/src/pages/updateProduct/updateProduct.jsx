import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"
import "./updateProduct.css"


const UpdateProduct = () => {

	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [descrip, setDescrip] = useState("");

	const navigate = useNavigate();

	const params = useParams();
	let produid = params.id;;

	const goHome = () => {
		navigate("/");
	}

	useEffect(() => {
		getProductData();
	}, []);

	const getProductData = async () => {
		let resultData = await axios.get("http://localhost:8090/api/product/getone/" + produid)
		setTitle(resultData.data.name)
		setPrice(resultData.data.price)
		setDescrip(resultData.data.description)
	}

	const updateProduct = async () => {
		let productData = {
			"name": title,
			"price": price,
			"description": descrip
		}
		try {
			let resultUpdate = await axios.put("http://localhost:8090/api/product/update/" + produid, productData);
			if (resultUpdate.status === 200) {
				navigate("/");
			}
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<div className="update">
			<h1>Update Product</h1>
			<form>
				<div className="updateInfo">
					<label>Title: </label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)} />
				</div>
				<br />
				<div className="updateInfo">
					<label>Price: </label>
					<input
						type="Number"
						value={price}
						onChange={(e) => setPrice(e.target.value)} />
				</div>
				<br />
				<div className="updateInfo">
					<label>Description: </label>
					<input
						type="text"
						value={descrip}
						onChange={(e) => setDescrip(e.target.value)} />
				</div>
			</form>
			<button onClick={goHome}>Home</button>
			<button onClick={updateProduct}>Update</button>
		</div>
	)
}

export default UpdateProduct;
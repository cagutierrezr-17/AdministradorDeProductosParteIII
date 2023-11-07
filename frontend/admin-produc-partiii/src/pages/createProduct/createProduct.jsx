import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./createProduct.css"


const CreateProduct = () => {

	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [descrip, setDescrip] = useState("");
	const [listProduct, setListProduct] = useState([]);

	const create = async (e) => {
		e.preventDefault(e);

		if (title !== "" && price !== "" && descrip !== "") {
			let dataProduct = {
				"name": title,
				"price": price,
				"description": descrip
			};
			try {
				let result = await axios.post("http://localhost:8090/api/product/create", dataProduct);
				console.log(result);
				if (result.status === 200) {
					setListProduct([...listProduct, dataProduct]);
					setTitle("");
					setPrice("");
					setDescrip("");
				}
			} catch (e) {
				console.log(e);
			}
		} else {
			alert("Complete el formulario")
		}
	}

	useEffect(() => {
		callListProduct();
	}, []);

	const callListProduct = async () => {
		let resultPro = await axios.get("http://localhost:8090/api/product/get")
		setListProduct(resultPro.data)
	}

	const deleteProduct = async (id) => {
		try {
			let result = await axios.delete("http://localhost:8090/api/product/create/delete/" + id)
			if (result.status === 200) {
				let listProductTemp = listProduct.filter((prod) => prod._id !== id);
				setListProduct(listProductTemp);
				alert("Producto borrado correctamente")
			} else {
				alert("Hubo un error");
			}
		} catch (e) {
			console.log(e);
		}
	}

	const navigate = useNavigate();
	const goToEdit = (id) => {
		navigate("/edit/" + id);
	}

	return (
		<div className="info">
			<h1>Product Manager</h1>
			<form>
				<div className="createInfo">
					<label>Title: </label>
					<input
						type="text"
						placeholder=" Ingresar nombre del producto"
						value={title}
						onChange={(e) => setTitle(e.target.value)} />
				</div>
				<br />
				<div className="createInfo">
					<label>Price: </label>
					<input
						type="Number"
						placeholder=" Ingresar precio del producto"
						value={price}
						onChange={(e) => setPrice(e.target.value)} />
				</div >
				<br />
				<div className="createInfo">
					<label>Description: </label>
					<input
						type="text"
						placeholder=" Ingresar descripción del producto"
						value={descrip}
						onChange={(e) => setDescrip(e.target.value)} />
				</div>
				<br />
				<button onClick={create}>Create</button>
			</form>
			<h2>All Products: </h2>
			{
				listProduct.map((prod, index) => {
					return <div key={index} className="list">
						<Link to={`/${prod._id}`}>{prod.name}</Link>
						<div className="contBtn">
							<button className="btnPro" onClick={() => deleteProduct(prod._id)}>Delete</button>
							<button className="btnPro" onClick={() => goToEdit(prod._id)}>Update</button>
						</div>
					</div>
				})
			}
		</div>
	)
}

export default CreateProduct;
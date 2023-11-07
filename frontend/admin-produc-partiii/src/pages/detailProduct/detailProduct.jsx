import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react";
import "./detailProduct.css"


const DetailProduct = () => {

	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [descrip, setDescrip] = useState("");
	const [idProd, setIdProduct] = useState("");

	const params = useParams();
	let productid = params.id;

	useEffect(() => {
		getProductData();
	}, [])

	const getProductData = async () => {
		try {
			let result = await axios.get("http://localhost:8090/api/product/getone/" + productid)
			setName(result.data.name)
			setPrice(result.data.price)
			setDescrip(result.data.description)
			setIdProduct(result.data._id)
		} catch (err) {
			console.log(err);
		};
	}

	const navigate = useNavigate();

	const goHome = () => {
		navigate("/");
	}

	const deleteProductdetail = async (idProd) => {
		try{
			let resultDeleteDetail = await axios.delete ("http://localhost:8090/api/product/create/delete/" + idProd)
			if (resultDeleteDetail.status === 200){
				navigate ("/");
			}else{
				alert("Hubo un error");
			}
		}catch(e){
			console.log(e);
		}
	};

	return (
		<div className="details">
			<h2>{name}</h2>
			<p className="info1">Precio: {price}</p>
			<p className="info1">Descripción: {descrip}</p>
			<br />
			<button onClick={goHome}>Home</button>
			<button onClick={() => deleteProductdetail(idProd)}>Delete Product</button>
		</div>
	)
}

export default DetailProduct;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateProduct from "./pages/createProduct/createProduct";
import DetailProduct from "./pages/detailProduct/detailProduct";
import UpdateProduct from "./pages/updateProduct/updateProduct"
import "./App.css"


function App() {
  return (
    <div>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<CreateProduct></CreateProduct>}></Route>
          <Route path="/:id" element={<DetailProduct></DetailProduct>}></Route>
          <Route path="/edit/:id" element={<UpdateProduct></UpdateProduct>}></Route>

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
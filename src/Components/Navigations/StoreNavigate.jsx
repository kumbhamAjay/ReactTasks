import { Route, Routes } from "react-router"

import Products from "./Products"
import { Link } from "react-router-dom"
import Electronics from "./Electronics"
import Jewelery from "./Jewelery"
import WomenClothing from "./WomenClothing"
import MenClothing from "./MenClothing"
import { useState } from "react"
import SingleProduct from "./SingleProduct"


const StoreNavigate = () => {
    const[product,setProduct]=useState(false)


  return (
    <div>
        <h1>Store</h1>
        {/* ["electronics","jewelery","men's clothing","women's clothing"] */}
        <button><Link to="/products">All products</Link></button>
        <button><Link to="/products/categories/electronics">electronics </Link></button>
        <button><Link to="/products/categories/jewelery">jewelery </Link></button>
        <button><Link to="/products/categories/men's clothing">men's clothing </Link></button>
        <button><Link to="/products/categories/women's clothing">women's clothing </Link></button>
       
        <Routes>
            <Route index element={<Products/>}/>
            <Route path="products" element={<Products/>}/>
            <Route path="/products/categories/electronics" element={<Electronics/>}/>
            <Route path="/products/categories/jewelery" element={<Jewelery/>}/>
            <Route path="/products/categories/men's clothing" element={<MenClothing/>}/>
            <Route path="/products/categories/women's clothing" element={<WomenClothing/>}/>
            <Route path="products/:product" element={<SingleProduct/>}/>
        </Routes>
      
    </div>
  )
}

export default StoreNavigate

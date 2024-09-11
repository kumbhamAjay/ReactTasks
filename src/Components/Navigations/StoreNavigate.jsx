import { Route, Routes } from "react-router"

import Products from "./Products"
import { Link } from "react-router-dom"
import Electronics from "./Electronics"
import Jewelery from "./Jewelery"
import WomenClothing from "./WomenClothing"
import MenClothing from "./MenClothing"
import { createContext, useState } from "react"
import SingleProduct from "./SingleProduct"

export const Context=createContext()


const StoreNavigate = () => {
  const [count,setCount]=useState(0)
  const handler=()=>{
    setCount(count+1)
  }
  const decHandler=()=>{
    setCount(count-1)
  }

  


  return (
    <div>
      <Context.Provider value={{count,handler,decHandler}}>
      <h1>Store</h1>
      <h1>Global Counter{count}</h1>
        {/* ["electronics","jewelery","men's clothing","women's clothing"] */}
        <button><Link to="/products">All products</Link></button>
        <button><Link to="/products/categories/electronics">electronics </Link></button>
        <button><Link to="/products/categories/jewelery">jewelery </Link></button>
        <button><Link to="/products/categories/men's clothing">men clothing </Link></button>
        <button><Link to="/products/categories/women's clothing">women clothing </Link></button>
       
        <Routes>
            <Route index element={<Products/>}/>
            <Route path="products" element={<Products/>}/>
            <Route path="/products/categories/electronics" element={<Electronics/>}/>
            <Route path="/products/categories/jewelery" element={<Jewelery/>}/>
            <Route path="/products/categories/men's clothing" element={<MenClothing/>}/>
            <Route path="/products/categories/women's clothing" element={<WomenClothing/>}/>
            <Route path="products/:product" element={<SingleProduct/>}/>
        </Routes>
      </Context.Provider>
       
      
    </div>
  )
}

export default StoreNavigate

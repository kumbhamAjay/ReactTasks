



import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from './StoreNavigate'

function SingleProduct() {
    const dynamicPath=useParams()
    const[productData,setProductData]=useState({})

    useEffect(()=>{
        fetchData()
    },[dynamicPath])


    const fetchData=async()=>{
        const response= await axios.get(`https://fakestoreapi.com/products/${dynamicPath.product}`)

        if(response.status===200){
            setProductData(response.data)
        }
    }
    const {handler,decHandler}=useContext(Context)
    

    
  return (
    <div>
         <button onClick={handler}>Increment Count</button>
         <button onClick={decHandler}>Decrement Count</button>
        <h3>Product data</h3>
        {
            Object.keys(productData).length >0 && <>
            <h2>{productData.title}</h2>
            <img src={productData.image}  height={100} width={100} />
            <p>{productData.description}</p>
            <h3>Price:{productData.price}</h3>
            <p>Rating:{productData.rating.rate}</p>
            </>
        }
    </div>
  )
}

export default SingleProduct

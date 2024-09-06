import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Products = () => {
    const[products,setProducts]=useState([])


    useEffect(()=>{
        fetchData()

    },[])
    const fetchData=async()=>{
        const{status,data}=await axios.get("https://fakestoreapi.com/products")
        if(status==200){
            setProducts([...data])
        }
    }
  return (
    <div style={{display:"flex",flexWrap:"wrap",gap:"auto"}}>
        {products.map((each)=>{
            return(
                <div key={each.id} style={{width:"300px",height:"300px",border:"1px solid",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                    <h4>{each.title}</h4>
                    <img src={each.image} height={100} width={100} alt="" />
                    <p>{each.price}</p>
                    <Link to={`/products/${each.id}`}>...See More</Link>

                </div>
            )
        })}
      
    </div>
  )
}

export default Products

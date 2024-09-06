import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from './StoreNavigate'

const WomenClothing = () => {
    const[clothes,setClothes]=useState([])
    useEffect(()=>{
        fetchData()
    },[])
    const fetchData=async()=>{
        const{data,status}=await axios.get("https://fakestoreapi.com/products/category/women's%20clothing")
        if(status==200){
            setClothes([...data])
        }
    }
    const{handler,decHandler}=useContext(Context)

  return (
    <>
    <h1>Women Clothing</h1>
    <button onClick={handler}>Increment Count</button>
    <button onClick={decHandler}>Decrement Count</button>
    <div style={{display:"flex",flexWrap:"wrap",gap:"auto"}}>
        {clothes.map((each)=>{
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
    </>
    
  )
}

export default WomenClothing

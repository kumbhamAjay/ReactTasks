// import React from 'react'
import { useRef, useState } from "react"
import "./weather.css"
// import { CiSearch } from 'react-icons/ci'
import { FaSearch } from 'react-icons/fa'
import axios from "axios"
const WeatherApp = () => {
    const[city,setCity]=useState("")
    const[temperature,setTemperature]=useState(false)
    const[icon,setIcon]=useState("")
    const[displayCity,setDisplayCity]=useState("")
    const ref=useRef("")
    const searchHandle=async(searchCity)=>{

        const result=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${import.meta.env.VITE_ID}`)
        const {data}=result
        setTemperature(Math.floor(data.main.temp-273.15))
        setIcon(data.weather[0].icon)
        setDisplayCity(data.name)
        ref.current.value=""
       
        
        // console.log(result)
    }
  return (
    <div className='main'>
        <div className="weather">
            <div className="search">
                <input type="text" placeholder="search city here..." ref={ref}  onChange={(e)=>{setCity(e.target.value)}} />
                <FaSearch onClick={()=>searchHandle(city)} className="search-bar"/>
            </div>
            {
                temperature&&<div className='display-data'>
                <div className="icon">
                    <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
                </div>
                <p>{displayCity}</p>
                <h1>{temperature}°C</h1>
              

            </div>
            }
            
        </div>
      
    </div>
  )
}

export default WeatherApp

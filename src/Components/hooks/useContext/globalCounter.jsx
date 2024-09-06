import { createContext, useState } from "react"





export const Context=createContext()

const GlobalCounter = () => {
    const[count,setCount]=useState(0)
    const handler=()=>{
        setCount(count+1)
    }
  return (
    <div>
        <Context.Provider value={count}>
            <h1>Counter{count}</h1>
            <button onClick={handler}>Increase</button>
            

            {/* <StoreNavigate/> */}
        </Context.Provider>
      
    </div>
  )
}

export default GlobalCounter

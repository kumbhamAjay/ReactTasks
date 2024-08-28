import React,{useState} from "react"



const Counter =()=>{
   const [age,setAge]=useState(10)

   const ageHandler=(type)=>{
    switch(type){
        case "INCREMENT":
           setInterval(()=>{
            setAge(age=>age+1)
           },1000)
            break
        case "DECREMENT":
            if(age>0){
                    setAge(age-1)
                    }else{
                        alert("Age cannot be negative")
                    }
                   
                   break
        case "RESET":
            setAge(0)
        default :
        break


    }
   }
return(
    <>
    <h3>Counter example</h3>

    <h3>Current age {age}</h3>
    <button onClick={()=>ageHandler("INCREMENT")} > Increment age</button>
    <button onClick={()=>ageHandler("DECREMENT")} > decrement age</button>
    <button onClick={()=>ageHandler("RESET")} > reset age</button>
    </>
)
}

export default Counter
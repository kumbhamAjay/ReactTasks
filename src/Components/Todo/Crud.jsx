import{ useState } from 'react'

const Crud = () => {
    
    const[name,setName]=useState("")
    const[mail,setMail]=useState("")
    const[phone,setPhone]=useState("")
    const[list,setList]=useState([])
    const[selected,setSelected]=useState(null)
    const nameHandle=(e)=>{
        setName(e.target.value)

    }
    const mailHandle=(e)=>{
        setMail(e.target.value)
    }
    const phoneHandle=(e)=>{
        setPhone(e.target.value)

    }

    const add=()=>{
        // console.log(name,phone,list.length,list)
        if(name&&mail&&phone){
            setList([...list,{name,mail,phone}])
            // setDetails(intialDetails)
            setName("")
            setMail("")
            setPhone("")

        }
        
       

    }
    const deleteHandle=(i)=>{
        const newList=list.filter((_,ind)=>ind!=i)
        setList(newList)

    }
    const updateHandle=(i)=>{
        setSelected(i)
        const data=list[i]
        // const copy=[...list]
        // const data=copy[i]
        setName(data.name)
        setMail(data.mail)
        setPhone(data.phone)
        // setList(copy)
        // setSelected(null)

    }
    const update=()=>{
        const copy=[...list]
        // console.log(copy[selected])
        copy[selected].name=name
        copy[selected].mail=mail
        copy[selected].phone=phone
        setList(copy)
       
        setSelected(null)

    }
  return (
    <div>
        <input type="text" placeholder='Name' value={name} onChange={nameHandle} />
        <input type="text" placeholder='Mail' value={mail} onChange={mailHandle}/>
        <input type="text" placeholder='Phone' value={phone} onChange={phoneHandle}/>
        <button onClick={selected!=null?update:add}>{selected===null?"Add":"Update"}</button>
        <h2>Details</h2>
        <div style={{display:"flex",flexWrap:"wrap",gap:"20px"}}>
            
            {
                list.length>0&&list.map((each,ind)=>{
                    return( <div key={ind} style={{border:"1px solid black",borderRadius:"10px",padding:"10px"}}>
                        <h3>Name:{each.name}</h3>
                        <h3>Mail:{each.mail}</h3>
                        <h3>Phone:{each.phone}</h3>
                        <button onClick={()=>deleteHandle(ind)}>Delete</button>
                        <button onClick={()=>updateHandle(ind)}>Update</button>

                    </div>)
                   
                })
            }
        </div>

      
    </div>
  )
}

export default Crud

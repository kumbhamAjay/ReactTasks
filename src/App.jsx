

// import CountryStates from "./Components/hooks/countrySates"
import { BrowserRouter } from "react-router-dom"
// import ControlledForm from "./Components/hooks/useRef/controlledForm"
import StoreNavigate from "./Components/Navigations/StoreNavigate"
import Crud from "./Components/Todo/Crud"





function App() {


  return (
    <>
    
  
    {/* <ControlledForm/> */}
    <BrowserRouter>
    {/* <StoreNavigate/> */}
    <Crud/>
    </BrowserRouter>
  
    </>
  )
}

export default App

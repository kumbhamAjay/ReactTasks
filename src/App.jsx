

// import CountryStates from "./Components/hooks/countrySates"
import { BrowserRouter } from "react-router-dom"
// import ControlledForm from "./Components/hooks/useRef/controlledForm"
import StoreNavigate from "./Components/Navigations/StoreNavigate"
import GlobalCounter from "./Components/hooks/useContext/globalCounter"





function App() {


  return (
    <>
    {/* <GlobalCounter/> */}
  
    {/* <ControlledForm/> */}
    <BrowserRouter>
    <StoreNavigate/>
    </BrowserRouter>
  
    </>
  )
}

export default App

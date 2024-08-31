import { useState } from "react";

import CustomTable from "../Table/CustomTable";
import { countries } from "../helpers.js/CountryStates";

function CountryStates() {
  const [countrySelected, setCountrySelected] = useState("");
  const [stateSelected, setStateSelected] = useState("");
  const [tableData,setTableData]=useState([])
  const changeCountryHandler = (e) => {
    // console.log(e.target.value);
    setCountrySelected(e.target.value);
  };
  const changeStateHandler = (e) => {
    // console.log(e.target.value);
    setStateSelected(e.target.value);
  };
  const submitHandler=(e)=>{
    e.preventDefault()
    setTableData([...tableData,{Country:countrySelected,State:stateSelected}])

  }
  return (
    <>
    <div>
        <form action="" onSubmit={submitHandler}>
      <label>Select Country</label>
      <select
        name="Country"
        id=""
        value={countrySelected}
        onChange={changeCountryHandler}
      >
        <option hidden>Countries</option>
        {Object.keys(countries).map((each, i) => {
          return (
            <option value={each} key={i}>
              {each}
            </option>
          );
        })}
      </select><br />
      {countrySelected && (
        <>
          <label>Select State</label>

          <select name="" id="" onChange={changeStateHandler}>
            <option hidden>States</option>
            {countries[countrySelected].map((each, i) => {
              return (
                <option value={each} key={i}>
                  {each}
                </option>
              );
            })}
          </select>
        </>
      )}<br/>
      <button type="submit">Submit</button>
      </form>
    </div>
    {tableData.length>0&&<CustomTable tableData={tableData}/>
}
    </>
  );
}

export default CountryStates;

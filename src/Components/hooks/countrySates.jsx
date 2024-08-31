import { useState } from "react";

import CustomTable from "../Table/CustomTable";
import { countries } from "../helpers.js/CountryStates";

function CountryStates() {
  const [countrySelected, setCountrySelected] = useState("");
  const [stateSelected, setStateSelected] = useState("");
  const [tableData, setTableData] = useState([]);
  const changeCountryHandler = (e) => {
    // console.log(e.target.value);
    setCountrySelected(e.target.value);
  };
  const changeStateHandler = (e) => {
    // console.log(e.target.value);
    setStateSelected(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setTableData([
      ...tableData,
      { Country: countrySelected, State: stateSelected },
    ]);
    setCountrySelected("");
    setStateSelected("");
  };
  return (
    <>
      <div style={{padding:"20px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:'center',background:"#d9b3ff",width:'500px'}}>
        <form action="" onSubmit={submitHandler} style={{padding:"20px"}}>
          <label >Select Country:</label>
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
          </select>
          <br /><br />

          <>
            <label>Select State  :</label>

            <select name="" id="" onChange={changeStateHandler}>
              <option hidden>States</option>
              {countrySelected &&
                countries[countrySelected].map((each, i) => {
                  return (
                    <option value={each} key={i}>
                      {each}
                    </option>
                  );
                })}
            </select>
          </>
          <br /><br />
          <button type="submit">Submit</button>
        </form>
        {tableData.length > 0 && <CustomTable tableData={tableData} />}
      </div>
      
    </>
  );
}

export default CountryStates;

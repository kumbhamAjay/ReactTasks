import { useState } from "react";
import { createNumbers } from "./jsHelpers";

const CardsEvenOdd = () => {
  let n = createNumbers();
  const [check, setCheck] = useState("");
  const clickhandle = (value) => {
    if (value % 2 == 0) {
      setCheck("Even");
    } else {
      setCheck("Odd");
    }
  };

  return (
    <>
      <h1>Clicked Card {check}</h1>
      <div style={{ display: "flex", flexWrap: "wrap" ,gap: "10px"}}>
        {n.map((e, index) => {
          return (
            <div
              onClick={() => clickhandle(e)}
              key={index}
              style={{
                height: "100px",
                width: "100px",
                border: "1px solid black",
                textAlign: "center",
                alignContent: "center",
                borderRadius:"10px"
                
              }}
            >
              {e}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default CardsEvenOdd;

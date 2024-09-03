import Table from "react-bootstrap/Table";
import { MdModeEdit } from "react-icons/md";

export default function CustomTable({ tableData ,dataToParent}) {
  const key = Object.keys(tableData[0]);
  // console.log(key)

  const obj = tableData.map((each) => {
    let c = {};
    for (let i = 0; i < key.length; i++) {
      c[`data${i}`] = each[key[i]];
    }
    return c;
  });
  ////////Edit.....................////
  const sendData=(data)=>{
    const KV=Object.entries(data)
    
    for(let i=0;i<KV.length;i++){
      KV[i][0]=key[i]
    }

    // console.log(KV)
    dataToParent(Object.fromEntries(KV))
  }
  
  //
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {key.map((each, i) => {
            return (
              <td key={i}>
                <strong>{each}</strong>
              </td>
            );
          })}
          <td>Edit</td>
        </tr>
      </thead>
      <tbody>
        {obj.map((eachObj, i) => {
          return (
            <tr key={i}>
              {Object.values(eachObj).map((each, index) => {
                return <td key={index}>{each}</td>;
              })}
              <td>
              <MdModeEdit onClick={()=>sendData(eachObj)}/>
            </td>
            </tr>
          );
        })}
      
      </tbody>
      
    </Table>
  );
}

import Table from "react-bootstrap/Table";

export default function CustomTable({ tableData }) {
  const key = Object.keys(tableData[0]);
  // console.log(key)

  const obj = tableData.map((each) => {
    let c = {};
    for (let i = 0; i < key.length; i++) {
      c[`data${i}`] = each[key[i]];
    }
    return c;
  });
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
        </tr>
      </thead>
      <tbody>
        {obj.map((eachObj, i) => {
          return (
            <tr key={i}>
              {Object.values(eachObj).map((each, index) => {
                return <td key={index}>{each}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

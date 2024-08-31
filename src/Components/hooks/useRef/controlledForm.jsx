import axios from "axios";
import { useState } from "react";
import CustomTable from "../../Table/CustomTable";

const ControlledForm = () => {
  const [mobile, setMobile] = useState("");
  const [model, setModel] = useState("");
  const [issues, setIssues] = useState([]);
  const [list, setList] = useState([]);
  const initialFormData={
    modelData:"",
    mobileNumber:"",
    issue:""
}

  const mobileChange = (e) => {
    setMobile(e.target.value);
    // console.log(mobile)
  };
  const modelChange = (e) => {
    setModel(e.target.value);
  };
  const issuesHandle = async(e) => {
    const { value, checked } = e.target;
    console.log(value, checked);
    
      await setIssues([...issues, value]);
    // console.log(issues,"check")

    // console.log(issues)
  };
  const postData = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/complaints",
        userData
      );
      // console.log(response);
      if (response.status == 201) {
        setIssues([]);
      } // Log the response data
    } catch (error) {
      console.error("There was an error making the request:", error);
    }
  };
  const getData = async () => {
    try {
      const result = await axios.get("http://localhost:5000/complaints");
    //   console.log(result);
      // Log the response data
      if (result.status == 200) {
        setList([...result.data]);
      }
    } catch (error) {
      console.error("There was an error making the request:", error);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    let d = { mobile: mobile, model: model, Issues: issues };
    await postData(d);
    await getData();
    setMobile(initialFormData.mobileNumber)
    setModel(initialFormData.modelData)
    setIssues(initialFormData.issue)
    e.target.reset()
    
  };
  const dele= async () => {
    
    try {
        const response = await axios.get('http://localhost:5000/complaints');
        const complaints = response.data;
        
        // Iterate through each complaint and delete it
        for (let complaint of complaints) {
            await axios.delete(`http://localhost:5000/complaints/${complaint.id}`);
        }
        setList([])
        
        console.log('All complaints deleted successfully');
    } catch (error) {
        console.error('Error deleting complaints:', error);
    }
    
};
  const deleteData=()=>{
    dele()
  }
  return (
    <>
      <h1>Mobile Complaint Form</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="mobile">Mobile:</label>
        <input type="text" value={mobile} onChange={mobileChange} />
        <br />
        <label htmlFor="model">Model :</label>
        <input type="text" value={model} onChange={modelChange} />
        <br />
        <label htmlFor="">Issues</label>
        <br />
        <input
          type="checkbox"
          value={"Functionality"}
          onChange={issuesHandle}
        />
        <label htmlFor="">Functionality Issue</label>
        <br />
        <input type="checkbox" value={"Display"} onChange={issuesHandle} />
        <label htmlFor="">Dispaly</label>
        <br />
        <input type="checkbox" value={"Battery"} onChange={issuesHandle} />
        <label htmlFor="">Battery Issue</label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        <button onClick={deleteData}>Delete Data</button>
        <h1>Complaints List</h1>
        {
          list.length>0&&<CustomTable tableData={list}/>
        }
          {/* <table>
        
          <tr>
            <td>
              <strong>Mobile Name</strong>
            </td>
            <td>
              <strong>Model</strong>
            </td>
            <td>
              <strong>Issues</strong>
            </td>
          </tr>
          {list.map((each, ind) => {
            return (
              <tr key={ind}>
                <td>{each.mobile}</td>
                <td>{each.model}</td>
                <td>{each.Issues.map((k,i)=>{
                    return(
                        <li key={i}>
                            {k}

                        </li>
                    )
                })}</td>
              </tr>
            );
          })}
        </table> */}
      </div>
    </>
  );
};
export default ControlledForm;

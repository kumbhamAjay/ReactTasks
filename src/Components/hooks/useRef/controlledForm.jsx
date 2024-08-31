import axios from "axios";
import { useState } from "react";
import CustomTable from "../../Table/CustomTable";
import './'

const ControlledForm = () => {
  const [mobile, setMobile] = useState("");
  const [model, setModel] = useState("");
  const [phone, setPhone] = useState("");
  const [issues, setIssues] = useState({});
  const [list, setList] = useState([]);
  let date = new Date();

  let issueKeys = Object.keys(issues);
  const initialFormData = {
    modelData: "",
    mobileNumber: "",
    issue: { Functionality: false, Display: false, Battery: false },
  };

  const mobileChange = (e) => {
    setMobile(e.target.value);
    // console.log(mobile)
  };
  const modelChange = (e) => {
    setModel(e.target.value);
  };
  const phoneChange = (e) => {
    setPhone(e.target.value);
  };
  const issuesHandle = async (e) => {
    const { value, checked } = e.target;
    // console.log(value, checked);

    setIssues({ ...issues, [value]: checked });
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
        setIssues(initialFormData.issue);
      } // Log the response data
      // console.log("data posted")
    } catch (error) {
      console.error("There was an error making the request:", error);
    }
  };
  const getData = async () => {
    try {
      const result = await axios.get("http://localhost:5000/complaints");
      // console.log(result.data);
      // Log the response data
      if (result.status == 200) {
        setList([...result.data]);
      }
      // console.log("got data")
    } catch (error) {
      console.error("There was an error making the request:", error);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    let issuesClicked = "";
    // console.log(issueKeys)
    issueKeys.forEach((e) => {
      // console.log(e, issues[e]);
      if (issues[e] == true) {
        issuesClicked += e + " ";
      }
    });
    // console.log(issuesClicked,"-------------")
    let d = {
      Mobile: mobile,
      Model: model,
      Phone: phone,
      Issues: issuesClicked,
      ComplaintRegisteredDateAndTimeTime: `Date:${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}, Time: ${date.toLocaleTimeString()} `,
    };
    // console.log(d);
    await postData(d);
    await getData();
    setMobile(initialFormData.mobileNumber);
    setModel(initialFormData.modelData);
    setIssues(initialFormData.issue);
    // e.target.reset()
  };
  const dele = async () => {
    try {
      const response = await axios.get("http://localhost:5000/complaints");
      const complaints = response.data;

      // Iterate through each complaint and delete it
      for (let complaint of complaints) {
        await axios.delete(`http://localhost:5000/complaints/${complaint.id}`);
      }
      setList([]);

      // console.log("All complaints deleted successfully");
    } catch (error) {
      console.error("Error deleting complaints:", error);
    }
  };
  const deleteData = () => {
    dele();
  };
  return (
    <div className="main">
      <h1>Mobile Complaint Form</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="mobile">Mobile Name:</label>
        <input type="text" value={mobile} onChange={mobileChange} required />
        <br />
        <label htmlFor="model">Model :</label>
        <input type="text" value={model} onChange={modelChange} required />
        <br />
        <label htmlFor="model">Phone No :</label>
        <input type="number" value={phone} onChange={phoneChange} required />
        <br />
        <label htmlFor="">Issues</label>
        <br />
        <input
          type="checkbox"
          value={"Functionality"}
          onChange={issuesHandle}
          checked={issues.Functionality}
        />
        <label htmlFor="">Functionality Issue</label>
        <br />
        <input
          type="checkbox"
          value={"Display"}
          onChange={issuesHandle}
          checked={issues.Display}
        />
        <label htmlFor="">Dispaly</label>
        <br />
        <input
          type="checkbox"
          value={"Battery"}
          onChange={issuesHandle}
          checked={issues.Battery}
        />
        <label htmlFor="">Battery Issue</label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        <button onClick={deleteData}>Delete Data</button>
        <h1>Complaints List</h1>
        {list.length > 0 && <CustomTable tableData={list} />}
       
      </div>
    </div>
  );
};
export default ControlledForm;

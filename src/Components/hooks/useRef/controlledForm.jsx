
import axios from "axios";
import { useState } from "react";
import CustomTable from "../../Table/CustomTable";
import { Modal, Button } from "react-bootstrap";

const ControlledForm = () => {
  const [mobile, setMobile] = useState("");
  const [model, setModel] = useState("");
  const [phone, setPhone] = useState("");
  const [issues, setIssues] = useState({});
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

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
      'Complaint Registered Date And Time': `Date:${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}, Time: ${date.toLocaleTimeString()} `,
    };
    // console.log(d);
     if (selectedRow) {
      // Update existing complaint
      console.log(selectedRow.id)
      await updateData(selectedRow.id, d);
    } else {
      // Create new complaint
      await postData(d);
    };
    await getData();
    setMobile(initialFormData.mobileNumber);
    setModel(initialFormData.modelData);
    setIssues(initialFormData.issue);
    setSelectedRow(null)
    setShowModal(false)
    // e.target.reset()
  };
  const updateData = async (id, updatedData) => {
    try {
      const response = await axios.patch(`http://localhost:5000/complaints/${id}`, updatedData);
      if (response.status === 200) {
        console.log("Data updated successfully");
      }
    } catch (error) {
      console.error("There was an error updating the data:", error);
    }
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
  const dataFromChild=(rowData)=>{
    // console.log(rowData)
    

    setSelectedRow(rowData);
    setMobile(rowData.Mobile);
    setModel(rowData.Model);
    setPhone(rowData.Phone);
    setIssues({
      Functionality: rowData.Issues.includes("Functionality"),
      Display: rowData.Issues.includes("Display"),
      Battery: rowData.Issues.includes("Battery"),
    });
    setShowModal(true);
  };
  
  return (
    <div className="main" style={{width:"600px",left:"0",right:"0",margin:"auto"}}>
      <h1 style={{textAlign:"center"}}>Mobile Complaint Form</h1>
      <form onSubmit={submitHandler} style={{width:"600px",backgroundColor:'aqua',borderRadius:"20px",left:"0",right:"0",margin:"auto",padding:"20px"}}>
        <label htmlFor="mobile">Mobile Name:</label>
        <input type="text" value={mobile} onChange={mobileChange} required />
        <br />
        <label htmlFor="model">Model :</label>
        <input type="text" value={model} onChange={modelChange} required />
        <br />
        <label htmlFor="model">Phone No :</label>
        <input type="te" value={phone} onChange={phoneChange} required />
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
        
        <h1>Complaints List</h1>
        <button onClick={deleteData}>Delete Data</button>
        {list.length > 0 && <CustomTable tableData={list} dataToParent={dataFromChild}/>}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRow ? "Edit Complaint" : "Add Complaint"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitHandler}>
            <label htmlFor="mobile">Mobile Name:</label>
            <input type="text" value={mobile} onChange={mobileChange} required />
            <br />
            <label htmlFor="model">Model :</label>
            <input type="text" value={model} onChange={modelChange} required />
            <br />
            <label htmlFor="model">Phone No :</label>
            <input type="text" value={phone} onChange={phoneChange} required />
            <br />
            <label>Issues</label>
            <br />
            <input type="checkbox" value="Functionality" onChange={issuesHandle} checked={issues.Functionality} />
            <label>Functionality Issue</label>
            <br />
            <input type="checkbox" value="Display" onChange={issuesHandle} checked={issues.Display} />
            <label>Display Issue</label>
            <br />
            <input type="checkbox" value="Battery" onChange={issuesHandle} checked={issues.Battery} />
            <label>Battery Issue</label>
            <br />
            <Button type="submit">Save Changes</Button>
          </form>
        </Modal.Body>
      </Modal>
       
      </div>
    </div>
  );
};
export default ControlledForm;

import axios from "axios";
import { useRef, useState } from "react";

import "./uncontrolled.css";

const UncontrolledComponent = () => {
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const [formErrors, setFormErrors] = useState({});
  const [result, setResult] = useState([]);


  const onSubmit = (event) => {
    event.preventDefault();

    const usernameEntered = usernameRef.current.value;

    const passwordEntered = passwordRef.current.value;

    const formErrors = validations(usernameEntered, passwordEntered);

    if (Object.keys(formErrors).length > 0) {
      //Trigger the errors
      setFormErrors(formErrors);
    } else {
      // Hit the api
      loginApi(usernameEntered, passwordEntered);
    }

    // console.log(formErrors)
  };

  const validations = (username, password) => {
    const FormErrors = {};

    if (!username) {
      FormErrors.usernameError = "Please enter username";
    } else if (username.length > 20) {
      FormErrors.usernameError = "Please enter less than 20 characters";
    }

    if (!password) {
      FormErrors.passwordError = "Please enter password";
    } else if (password.length > 20) {
      FormErrors.passwordError = "Please enter less than 20 characters";
    }

    return FormErrors;
  };

  const loginApi = async (username, password) => {
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: username,
        password: password,
      });

      const { data, status } = response;
      if (status == 200) {
        let c = 0;
        for (let i of result) {
          if (data.id == i.id) {
            c++;
            alert("User data already exists");
          }
        }
        if (c == 0) {
          setResult([
            ...result,
            { username: username, password: password, id: data.id },
          ]);
        }

        // console.log(response);
      }
    } catch (err) {
      alert("Error 400 Not found");
    }
  };
  const deleteHandle = (o) => {
    let newResult=result.filter((obj, i) => {
        if (o.id != obj.id) {
          return obj;
        }
      })
    //   console.log(newResult)
    setResult([...newResult]);
  };

  return (
    <>
      <div className="cont">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Email address:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              ref={usernameRef}
            />
            <span style={{ color: "red" }}>{formErrors?.usernameError}</span>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              ref={passwordRef}
            />
            <span style={{ color: "red" }}>{formErrors?.passwordError}</span>
          </div>
          <br />

          <button type="submit" className="btn btn-default bg-primary">
            Submit
          </button>
        </form>
      </div>
      <div className="table">
        <table>
          <tr>
            <td>
              <strong>Username</strong>
            </td>
            <td>
              <strong>Password</strong>
            </td>
            <td>
              <strong>Manage</strong>
            </td>
          </tr>
          {result.length > 0 &&
            result.map((each, ind) => {
              return (
                <tr key={ind}>
                  <td>{each["username"]}</td>
                  <td>{each["password"]}</td>
                  <td>
                    <button onClick={() => deleteHandle(each)}>Delete</button>
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    </>
  );
};

export default UncontrolledComponent;

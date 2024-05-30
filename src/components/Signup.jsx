import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

function Signup(props) {
  const customCssSU = {
    backgroundColor: "#4D869C",
    // borderColor: "#CDE8E5",
    color: "#CDE8E5"
}
  const [userDetails, setUserDetails] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setUserDetails((prev) => {
      if (name === "fullname") {
        return {
          fullname: value,
          email: prev.email,
          password: prev.password,
        };
      } else if (name === "email") {
        return {
          fullname: prev.fullname,
          email: value,
          password: prev.password,
        };
      } else if (name === "password") {
        return {
          fullname: prev.fullname,
          email: prev.email,
          password: value,
        };
      }
    });
    event.preventDefault();
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(`${apiUrl}/register`, userDetails)
      .then((response) => {
        if (response.status === 200) {
          navigate("/");
        } else {
          navigate("/signup");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("Something Wrong Plz try again later!!");
          setUserDetails({
            fullname: "",
            email: "",
            password: "",
          });
        } else {
          alert("Plz try again");
          console.log(err);
        }
      });
  }

  return (
    <div className="d-flex .flex-column vh-100 justify-content-center">
      <div><h1>Sign Up</h1></div>
      <div className="p-5  rounded position-absolute mt-5" style={{backgroundColor: "#7AB2B2"}}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={userDetails.fullname}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
              name="email"
              value={userDetails.email}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="password"
              placeholder="Password"
              name="password"
              value={userDetails.password}
              required
            />
          </Form.Group>
          <Button className="w-100" variant="contained" style={customCssSU} type="submit">
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Signup;

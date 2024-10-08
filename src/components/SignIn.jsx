import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext.js";
import Cookies from "js-cookie";
import DialogBox from "./DialogBox.jsx";

const apiUrl = process.env.REACT_APP_API_URL;

function Login() {
  const [dialogBox, setDialogBox] = useState({});
  const customCssCA = {
    backgroundColor: "#7AB2B2",
    borderColor: "#CDE8E5",
    color: "#CDE8E5",
  };

  const customCssLI = {
    backgroundColor: "#4D869C",
    // borderColor: "#CDE8E5",
    color: "#CDE8E5",
  };

  const { setUserDetailsContext } = useContext(UserContext);

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setUserDetails((prev) => {
      if (name === "username") {
        return {
          username: value,
          password: prev.password,
        };
      } else if (name === "password") {
        return {
          username: prev.username,
          password: value,
        };
      }
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(`${apiUrl}/login`, userDetails)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          // After successful login
          const token = response.data.token; //fetching token value from the response given by the server
          Cookies.set("token", token, { expires: 1, path: "/" }); // Cookie expires in 1 day and setting token to the cookies of react app
          setUserDetailsContext(response.data.user);
          window.location.reload();
          // navigate('/',{replace: true});
          // navigate("/home");
        } else {
          alert("Something wrong");
          navigate("/login");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          const dialogBox = document.getElementById("dialogBox");
          setDialogBox({
            type: "idpsd",
            title: "Id / Password",
            definition: "Id or Password is wrong!!, please try again",
            buttonTitle: "Try Again",
          });
          dialogBox.style.display = "block";
          setUserDetails({
            username: "",
            password: "",
          });
        }
        // else if (err.response.status === 500) {
        //   const dialogBox = document.getElementById("dialogBox");
        //   setDialogBox({
        //     type: "server err",
        //     title: "Server Error",
        //     definition: "Sorry for inconvenience🙇🙇",
        //     buttonTitle: "Try again later",
        //   });
        //   dialogBox.style.display = "block";
        //   setUserDetails({
        //     username: "",
        //     password: "",
        //   });
        // }
        else {
          // alert("You are not registered, Plz create your account.");
          const dialogBox = document.getElementById("dialogBox");
          setDialogBox({
            type: "unregistered",
            title: "Unregistered User",
            definition: "You are not registered, Plz create your account.",
            buttonTitle: "OK",
          });
          dialogBox.style.display = "block";
          // navigate("/signup");
        }
      });
  }

  return (
    <div className="d-flex .flex-column vh-100 justify-content-center ">
      <div>
        <h1>Log In</h1>
      </div>
      <div
        className="p-5 rounded position-absolute mt-5"
        style={{ backgroundColor: "#7AB2B2" }}
      >
        {/* <Form action="http://localhost:5000/api/login" method="POST"> */}
        {/* Uncommand the above line if want to send post request from form itself */}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
              name="username"
              value={userDetails.username}
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
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Button
              variant="container"
              className="w-100"
              style={customCssLI}
              type="submit"
            >
              Login
            </Button>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Link to="/signup" className="text-decoration-none">
              <Button className="w-100" style={customCssCA} type="submit">
                Create Account
              </Button>
            </Link>
          </Form.Group>
        </Form>
        <DialogBox
          type={dialogBox.type}
          title={dialogBox.title}
          definition={dialogBox.definition}
          buttonTitle={dialogBox.buttonTitle}
        />
      </div>
    </div>
  );
}

export default Login;

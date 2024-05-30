// client/src/App.js
import React, { useEffect, useState } from "react";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Login from "./components/SignIn";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { NotesProvider } from "./context/NoteContext";
import Cookies from "js-cookie";
// import { json } from 'body-parser';
// import { text } from 'body-parser';

// const apiUrl = process.env.REACT_APP_API_URL;
// console.log(apiUrl);
const isAuthenticated = () => {
  // Replace with real authentication check
  return !!Cookies.get("token");
};

function App() {
  // const [message, setMessage] = useState('');
  // const [fName, setFName] = useState("");
  //   const myNotes = [{
  //     title: "Study",
  //     content: "React Hooks"
  //   },
  //   {
  //     title: "Shopping",
  //     content: "Buy Milk, Buy Cookies, Buy Vegetables"
  //   },{
  //     title: "Honey",
  //     content: "Buy Honey"
  //   }

  // ]
  // const [userDetails, setUserDetails] = useState({});

  // const UserDetailsContext = createContext();

  // const fetchUser = async () => {
  //   // Replace with your API call
  //   const response = await fetch('/api/protected');
  //   const userData = await response.json();
  //   setUserDetails(userData);
  //   console.log(userDetails);
  // };

  // // Fetch user data on mount
  // useEffect(() => {
  //   fetchUser();
  // }, []);
  // const [notes, setNotes] = useState([]);
  // const [content, setContent] = useState("");
  // console.log(notes);

  // function handleChange(event) {
  //     setFName(event.target.value);
  // }

  // function onSelect(event) {
  //   const [note] = notes.filter((note) => note.title === event.target.value);

  //   setContent(note.content);
  // }



  return (
    <UserProvider>
      <NotesProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<Login />}></Route> */}
            {/* token ? <Route path="/home" element={<Home />}></Route> :
            <Route path="/" element={<Login />}></Route> */}
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/" element={<PrivateRoute />}></Route>
            {/* <Route path="/home" element={<Home />}></Route> */}
            {/* <Route
              path="/"
              element={() =>
                isAuthenticated() ? <Home /> : <Navigate to="/login" />
              }
            /> */}
          </Routes>
        </BrowserRouter>
      </NotesProvider>
    </UserProvider>
  );
}

const PrivateRoute = () => {
  return isAuthenticated() ? <Home /> : <Login />;
};
// const PublicRoute = () => {
//   return isAuthenticated() ? <Home /> : <Navigate to="/login" />;
// };
export default App;
// export {apiUrl};

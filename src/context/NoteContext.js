import React, { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import Cookies from "js-cookie";

// const apiUrl = process.env.REACT_APP_API_URL;

// Create context
const NotesContext = createContext();

// Create provider component
function NotesProvider({ children }) {
  const { userDetailsContext } = useContext(UserContext);
  const [notesDetailsContext, setNotesDetailsContext] = useState(() => {
    // Retrieve data from localStorage if it exists
    const savedData = localStorage.getItem("notes");
    return savedData ? JSON.parse(savedData) : {};
  });
  const fetchNotes = () => {
    // Before sending a request to a protected route
    const token = Cookies.get("token"); // getting token from cookie of react app
    const headers = token ? { Authorization: `Bearer ${token}` } : {}; // if token is present in the cookie of react app then take token with request to the server, such that server checks corresponding token exist or not for authentication
    const url = "http://localhost:5000/api/protected/note/get";
    axios
      .post(url, userDetailsContext, { headers })
      .then(function (response) {
        // handle success
        // console.log(response.data.user);
        setNotesDetailsContext(response.data.user);
      })
      .catch(function (error) {
        // handle error
        // alert("Unknown call")
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  // Fetch user data on mount
  useEffect(() => {
    fetchNotes();
  }, [userDetailsContext]);

  useEffect(() => {
    // Save data to localStorage whenever it changes
    if (notesDetailsContext) {
      localStorage.setItem("notes", JSON.stringify(notesDetailsContext));
    }
  }, [notesDetailsContext]);

  return (
    <NotesContext.Provider
      value={{ notesDetailsContext, setNotesDetailsContext }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export { NotesContext, NotesProvider };

import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { UserContext } from "../context/UserContext.js";
import { useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { NotesContext } from "../context/NoteContext.js";
import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = process.env.REACT_APP_API_URL;

function Home() {
  // const [notes, setNotes] = useState([]);
  const { userDetailsContext } = useContext(UserContext);
  const { notesDetailsContext, setNotesDetailsContext } =
    useContext(NotesContext);

  function addNote(newNote) {
    if (newNote.note_title === "" || newNote.note_content === "") {
      alert("Please fill title or content of the note");
    } else {
      setNotesDetailsContext((prevNotes) => {
        return [...prevNotes, newNote];
      });
      const { note_title, note_content, note_date } = newNote;
      const note = [userDetailsContext.user_id, note_title, note_content, note_date];
      const token = Cookies.get("token"); // getting token from cookie of react app
      const headers = token ? { Authorization: `Bearer ${token}` } : {}; // if token is present in the cookie of react app then take token with request to the server, such that server checks corresponding token exist or not for authentication
      const url = `${apiUrl}/protected/note/set`;
      axios
        .post(url, note, { headers })
        .then(function (response) {
          // handle success
          console.log(response.data.user);
          // setNotesDetailsContext(response.data.user);
          alert("Note Added Successfully !!");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }
  }

  function deleteNote(id) {
    setNotesDetailsContext((prevNotes) => {
      return prevNotes.filter((noteItem) => {
        return noteItem.note_id !== id;
      });
    });
    const deleteNoteDetail = [userDetailsContext.user_id, id];
    const token = Cookies.get("token"); // getting token from cookie of react app
    const headers = token ? { Authorization: `Bearer ${token}` } : {}; // if token is present in the cookie of react app then take token with request to the server, such that server checks corresponding token exist or not for authentication
    const url = `${apiUrl}/protected/note/delete`;
    axios
      .post(url, deleteNoteDetail, { headers })
      .then(function (response) {
        // handle success
        console.log(response.data.user);
        // setNotesDetailsContext(response.data.user);
        alert("Note Deleted Successfully !!");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  if (!userDetailsContext) {
    return (
      <div className="position-absolute top-50">
        <div className="d-flex justify-content-center align-content-center">
          <CircularProgress color="secondary" />
        </div>
      </div>
    );
  }
  return (
    <div className="main-flex-container">
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="note-flex-item">
        <div className="note-grid-container">
          {notesDetailsContext.length ? (
            notesDetailsContext.map((noteItem) => {
              return (
                <Note
                  key={noteItem.note_id}
                  id={noteItem.note_id}
                  note_title={noteItem.note_title}
                  note_content={noteItem.note_content}
                  note_date={noteItem.note_date}
                  onDelete={deleteNote}
                />
              );
            })
          ) : (
            <p>You don't have notes!!</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

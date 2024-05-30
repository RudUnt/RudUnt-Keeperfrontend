import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

function CreateArea(props) {
  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth()+1).padStart(2, "0");
  const todayDate = String(dateObj.getDate()).padStart(2, "0");
  const date = year + "-" + month + "-" + todayDate;

  const [note, setNote] = useState({
    note_title: "",
    note_content: "",
    note_date: date,
  });

  const [isExpanded, Expanded] = useState(false);

  function handleClick(event) {
    Expanded(true);
    event.preventDefault();
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      note_title: "",
      note_content: "",
      note_date: date,
    });
    event.preventDefault();
  }

  return (
    <div className="main-flex-item">
      <form className="create-note">
        {isExpanded && (
          <input
            id="focused"
            htmlFor="note_content"
            name="note_title"
            onChange={handleChange}
            value={note.note_title}
            placeholder="Title"
            required
          />
        )}

        <textarea
          name="note_content"
          onClick={handleClick}
          onChange={handleChange}
          value={note.note_content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          required
        />

        {isExpanded && (
          <input
            className="myDate"
            onChange={handleChange}
            type="date"
            name="note_date"
            value={note.note_date}
            min={note.note_date}
            required
          />
        )}

        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;

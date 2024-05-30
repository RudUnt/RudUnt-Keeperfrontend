import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';

function Note(props) {

  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note note-grid-item">
     {/* <EditNoteIcon className="position-relative start-100 pe-4"></EditNoteIcon> */}
     <p style={{fontWeight:"ligher", fontSize: "10px"}}>{props.note_date}</p>
      <h1>{props.note_title}</h1>
      <p>{props.note_content}</p>
      <Zoom in={true}>
        <Fab onClick={handleClick}>
          <DeleteIcon />
        </Fab>
      </Zoom>
    </div>
  );
}

export default Note;

import React, { useContext } from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import { UserContext } from "../context/UserContext";
import { NotesContext } from "../context/NoteContext";
import axios from "axios";

function Header(props) {
  // const navigate = useNavigate();
  const { userDetailsContext } = useContext(UserContext);
  const { setNotesDetailsContext } = useContext(NotesContext);

  function handleDateChange(event) {
    event.preventDefault();
    const date = event.target.value;
    console.log(date);

    // setNotesDetailsContext((prevNotes) => {
    //   return prevNotes.filter((noteItem) => {
    //     return noteItem.note_id !== id;
    //   });
    // });
    const details = [userDetailsContext.user_id, date];
    const token = Cookies.get("token"); // getting token from cookie of react app
    const headers = token ? { Authorization: `Bearer ${token}` } : {}; // if token is present in the cookie of react app then take token with request to the server, such that server checks corresponding token exist or not for authentication
    const url = "http://localhost:5000/api/protected/note/getnotebydate";
    axios
      .post(url, details, { headers })
      .then(function (response) {
        // handle success
        // console.log(response.data.user);
        if (response.data.user.length === 0) {
          window.location.reload();
          alert("You don't have any notes for mentioned date (" + date + ")");
        } else {
          setNotesDetailsContext(response.data.user);
          console.log(response.data.user);
          // setNotesDetailsContext(response.data.user);
        }

        // alert("Note Deleted Successfully !!");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  function handleClick(event) {
    event.preventDefault();
    Cookies.remove("token");
    localStorage.removeItem("notes");
    localStorage.removeItem("userDetails");
    window.location.reload();
    alert("Logged out successfully!!");
    // navigate("/", {replace: true})
    // Redirect to login page
    // navigate("/");

    // axios
    //   .post("/api/logout")
    //   .then((response) => {
    //     if (response.status === 200) {

    //       navigate("/");
    //     } else {
    //       console.log("Some error plz try later!!");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  return (
    <div className="main-flex-item">
      <header>
        <div className="header-grid-container">
          <div className="header-grid-item1">
            <h3>
              <HighlightIcon />
              Keeper
            </h3>
          </div>
          <div className="header-grid-item2">
            <p>Hello, {userDetailsContext.username}</p>
          </div>
          <div className="header-grid-item3">
            <input
              type="date"
              id=""
              name="notedate"
              onChange={handleDateChange}
            ></input>
            <LogoutIcon className="logout" onClick={handleClick} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;

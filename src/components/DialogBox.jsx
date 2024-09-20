import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function DialogBox(props) {
  const navigate = useNavigate();
  const dialogBox = useRef(null);
  // console.log(dialogBox)
  function closeDialogBox() {
    dialogBox.current.style.display = "none";
    if (props.type === "unregistered") {
      navigate("/signup");
    }
  }
  // Close the modal if clicking outside of the modal content
  window.onclick = function (event) {
    if (event.target === dialogBox.current) {
      dialogBox.current.style.display = "none";
    }
  };
  return (
    // Popup dialog box
    <div ref={dialogBox} id="dialogBox" className="modal"> 
      <div className="modal-content">
        <span id="closeDialogBtn" className="close">
          &times;
        </span>
        <h2>{props.title}</h2>
        <p>{props.definition}</p>
        {/* <button id="confirmBtn">Confirm</button> */}
        <button onClick={closeDialogBox} id="cancelBtn">
          {props.buttonTitle}
        </button>
      </div>
    </div>
  );
}

export default DialogBox;

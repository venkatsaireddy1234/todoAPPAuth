import React from "react";

function Modal({modalHandler}) {
  return (
    <div className="modal">
      <p>Enter Your task</p>
      <input type="text" placeholder="Name of the task" className="input" />
      <div className="modalBtns">
        <input type="submit" />
        <button onClick={()=>modalHandler()}>Close</button>
      </div>
    </div>
  );
}

export default Modal;

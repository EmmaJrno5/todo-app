import React, { useState } from "react";
import "./Todo.css";

import IconCheck from "./assets/images/icon-check.svg";
import Cancel from "./assets/images/icon-cross.svg";
function Todo({ todo, handleDelete, handleToggle, index }) {
  return (
    <div className="todo">
      <div
        onClick={()=> handleToggle(index)}
        className={todo.isChecked ? "tick-circle checked" : "tick-circle"}
        style={{cursor: 'pointer'}}
      >
        {todo.isChecked ? <img src={IconCheck} alt="Check Icon" /> : ""}
      </div>
      <p
        style={
          !todo.isChecked
            ? { textDecoration: "none" }
            : { textDecoration: "line-through" }
        }
      >
        {todo.text}
      </p>
      <img onClick={()=> handleDelete(index)} src={Cancel} alt="Cancel Icon" />
    </div>
  );
}

export default Todo;

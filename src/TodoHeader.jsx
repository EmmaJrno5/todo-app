import React,{useEffect, useRef, useState} from "react";
import "./TodoHeader.css";
import Sun from "./assets/images/icon-sun.svg";
import Moon from "./assets/images/icon-moon.svg";
function TodoHeader({ handleChange, mode }) {
  
   
  return (
    <div
      className="todo-header"
    >
      <h1 style={{ textTransform: "uppercase" }}>Todo</h1>
      <button onClick={() => handleChange()}>
        <img src={mode ? Sun : Moon} alt="Moon Icon" />
      </button>
    </div>
  );
}

export default TodoHeader;

import React, { useState } from "react";
import "./TodoFooter.css";

import TodoFooterBtn from "./TodoFooterBtn";

function TodoFooter({ handleFilter }) {
  const [filterList,setFilterList] = useState([
    { isActive: true, name: "all" },
    { isActive: false, name: "active" },
    { isActive: false, name: "completed" },
  ])

  const handleActiveStatus = (index)=>{
    setFilterList(filterList.map((item, i) => {
      return index === i ? { ...item, isActive: true } : {...item, isActive: false}
      }))
    
  }
  return (
    <div className="todo-footer">
      {filterList.map((filter,index) => (
        <TodoFooterBtn
          key={index}
          index={index}
          filter={filter.name}
          isActive={filter.isActive}
          handleFilter={handleFilter}
          handleActiveStatus={handleActiveStatus}
        />
      ))}
    </div>
  );
}

export default TodoFooter;

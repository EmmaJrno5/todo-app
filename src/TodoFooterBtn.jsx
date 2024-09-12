import React from 'react'

function TodoFooterBtn({filter,handleFilter,isActive,handleActiveStatus,index}) {
    const handleChanges = ()=>{
        handleFilter(filter)
        handleActiveStatus(index)
    }
  return (
    <button onClick={handleChanges} style={{textTransform: 'capitalize'}} className={isActive ? "active": ""}>{filter}</button>
  )
}

export default TodoFooterBtn
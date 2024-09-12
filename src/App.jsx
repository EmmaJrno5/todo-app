import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./App.css";

import TodoHeader from "./TodoHeader";
import TodoSearch from "./TodoSearch";
import Todo from "./Todo";
import TodoFooter from "./TodoFooter";
import { v4 as uuidv4 } from "uuid";

import lightDesktopBGImage from "./assets/images/bg-desktop-light.jpg";
import darkDesktopAppBGImage from "./assets/images/bg-desktop-dark.jpg";
import lightMobileAppBGImage from "./assets/images/bg-mobile-light.jpg";
import darkMobileAppBGImage from "./assets/images/bg-mobile-dark.jpg";
function App() {
  const [isDark, setIsDark] = useState(false);
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [filteredTodos, setFilteredTodos] = useState(todos);


  // Handle Filter Btns
  const handleFilter = (filter) => {
    switch (filter) {
      case "all":
        return setFilteredTodos(todos);
      case "active":
        return setFilteredTodos(todos.filter((todo) => !todo.isChecked));
      case "completed":
        return setFilteredTodos(todos.filter((todo) => todo.isChecked));
      default:
        return setFilteredTodos(todos);
    }
  };

  // Handle Add Todo changes from the parent
  const addTodo = (setText) => {
    setTodos([...todos, {id: uuidv4().toString() , isChecked: false, text: setText }]);
  };

  // Handle checked and unchecked todos
  const handleToggle = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, isChecked: !todo.isChecked } : todo
    );
    setTodos(updatedTodos);
  };

  // Handle Deletion of todos
  const handleDelete = (index) => {
    const updatedTodos = todos.filter((todo, i) => i !== index);
    setTodos(updatedTodos);
  };

  // Handle Clear Completed
  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.isChecked);
    setTodos(updatedTodos);
  };

  // Handle Drag End
  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const reorderedTodos = Array.from(todos);
    const [movedTodo] = reorderedTodos.splice(source.index, 1);
    reorderedTodos.splice(destination.index, 0, movedTodo);

    setTodos(reorderedTodos);
  };

  
  //  Get number of todos
  const numberOfTodos = filteredTodos.length;

  // Handle Changes for image with relation to the screen size
  const [isLargeScreen, setIsLargeScreen] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = (e) => setIsLargeScreen(e.matches);

    mediaQuery.addEventListener("change", handleChange);

    // Cleanup event listener on when component unmounts
    
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);


  useEffect(() => {
    // Initialize filteredTodos to show all todos initially
    setFilteredTodos(todos);
  }, [todos])

   // Save todos to localStorage whenever they change
   useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  // Handle App Mode (Light or Dark) and Image to Show depending on screen size
  const changeIsDark = () => {
    setIsDark(!isDark);
  };

  let image;
  if (isLargeScreen && isDark) {
    image = darkDesktopAppBGImage;
  } else if (isLargeScreen && !isDark) {
    image = lightDesktopBGImage;
  } else if (!isLargeScreen && isDark) {
    image = darkMobileAppBGImage;
  } else {
    image = lightMobileAppBGImage;
  }
  const lightStyles = {
    underlay: "hsl(0, 0%, 98%)",
    reusable: "white",
    todoText: "hsl(236, 9%, 61%)",
    bottomText: "hsl(236, 9%, 61%)",
    textInput: "black",
  };
  const darkStyles = {
    underlay: "hsl(235, 21%, 11%)",
    reusable: "hsl(235, 24%, 19%)",
    todoText: "hsl(234, 39%, 85%)",
    bottomText: "hsl(233, 14%, 35%)",
    textInput: "hsl(234, 39%, 85%)",
  };
  const selectedStyle = isDark ? darkStyles : lightStyles;
  const { underlay, reusable, todoText, bottomText, textInput } = selectedStyle;

  console.log(todos);
  return (
    <div className="todo-app">
      <img className="app-bg-image" src={image} alt="Todo Bg Image" />
      <div className="underlay" style={{ backgroundColor: underlay }}></div>
      <div className="container">
        <TodoHeader handleChange={changeIsDark} mode={isDark} />
        <TodoSearch
          bgColor={reusable}
          color={textInput}
          handleAddTodo={addTodo}
        />
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={Math.random().toString()}>
            {(provided) => (
              <div
                className="todo-list"
                style={{ backgroundColor: reusable, color: todoText }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {filteredTodos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Todo
                          index={index}
                          todo={todo}
                          handleToggle={handleToggle}
                          handleDelete={handleDelete}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="bottom-info" style={{ backgroundColor: reusable }}>
            <button>
              {numberOfTodos} item{numberOfTodos <= 1 ? "" : "s"} left
            </button>
            <button onClick={clearCompleted}>Clear completed</button>
          </div>
        </div>
        <TodoFooter handleFilter={handleFilter} />
        <p className="dragdrop-info" style={{ color: bottomText }}>
          Drag and drop to reorder list
        </p>
      </div>
   
  );
}

export default App;

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import Footer from "./components/Footer";
import "./index.css";

const data = [
  { id: 1, content: "Complete the challenge", completed: true },
  { id: 2, content: "Walking with the dog", completed: false },
  { id: 3, content: "Prepare the lunch", completed: false },
  { id: 4, content: "Read for 1 hour", completed: false },
  { id: 5, content: "Pick up groceries", completed: false },
  { id: 6, content: "Look for a new challenge", completed: false },
];

function App() {
  const [themeLight, setThemeLight] = useState(true);
  const [todos, setTodos] = useState(data);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [filterStatus, setFilterStatus] = useState("all");

  const toggleTheme = () => {
    setThemeLight(!themeLight);
  };

  const themeClass = themeLight ? "light" : "dark";

  useEffect(() => {
    const handleFilter = () => {
      switch (filterStatus) {
        case "active":
          return setFilteredTodos(todos.filter((todo) => !todo.completed));

        case "completed":
          return setFilteredTodos(todos.filter((todo) => todo.completed));

        default:
          return setFilteredTodos(todos);
      }
    };
    handleFilter();
  }, [todos, filterStatus]);

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className={`wrapper ${themeClass}`}>
      <div className="container">
        <Header themeLight={themeLight} setThemeLight={setThemeLight} />
        <main>
          <TodoForm todos={todos} setTodos={setTodos} />
          <TodoList
            todos={todos}
            setTodos={setTodos}
            filteredTodos={filteredTodos}
            deleteTodo={deleteTodo}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;

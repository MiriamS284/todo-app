import React, { useState } from "react";
import IconCheck from "../images/icon-check.svg";
import IconCross from "../images/icon-cross.svg";

const TodoItem = ({ todo, todos, setTodos, deleteTodo }) => {
  const [mutableTodo, setMutableTodo] = useState(todo);

  const classes = mutableTodo.completed ? "completed" : "";
  const checkIcon = mutableTodo.completed ? (
    <img src={IconCheck} alt="Completed" />
  ) : (
    ""
  );

  const toggleCompleted = () => {
    setMutableTodo({ ...mutableTodo, completed: !mutableTodo.completed });
    const updatedTodos = todos.map((item) =>
      item.id === todo.id ? { ...item, completed: !item.completed } : item
    );
    setTodos(updatedTodos);
  };

  return (
    <li className={classes}>
      <label htmlFor={`todoCheckbox-${todo.id}`}>Completed Checkbox</label>
      <input
        id={`todoCheckbox-${todo.id}`}
        type="checkbox"
        name="completed-checkbox"
        defaultChecked={mutableTodo.completed}
      />
      <div className="checkbox-border-wrap">
        <span className="checkbox" onClick={toggleCompleted}>
          {checkIcon}
        </span>
      </div>
      <p>{mutableTodo.content}</p>
      <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
        <img src={IconCross} alt="Delete" />
      </button>
    </li>
  );
};

export default TodoItem;

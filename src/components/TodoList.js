import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TodoItem from "./TodoItem";
import TodoFilterControl from "./TodoFilterControl";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1); // Korrigiere Tippfehler spplice -> splice
  result.splice(endIndex, 0, removed);
  return result;
};

const TodoList = ({
  todos,
  setTodos,
  filteredTodos,
  filterStatus,
  setFilterStatus,
  deleteTodo,
}) => {
  const [leftTodoCount, setLeftTodoCount] = useState(0);

  useEffect(() => {
    const unCompletedTodos = todos.filter((todo) => !todo.completed);
    setLeftTodoCount(unCompletedTodos.length);
  }, [todos]);

  const clearCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const updatedTodos = reorder(
      filteredTodos, // Achten Sie darauf, filteredTodos statt todos zu benutzen, wenn Sie filterStatus verwenden
      result.source.index,
      result.destination.index
    );
    setTodos(updatedTodos);
  };

  const textPlacer = filterStatus === "completed" ? "completed tasks" : "tasks";
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <section
              className="todo-list-section"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <ul className="todo-list">
                {filteredTodos.length < 1 ? (
                  <p className="info-text">There's no {textPlacer}.</p>
                ) : (
                  filteredTodos.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={String(todo.id)}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TodoItem
                            todo={todo}
                            setTodos={setTodos}
                            todos={todos}
                            deleteTodo={deleteTodo}
                          />
                        </li>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </ul>
            </section>
          )}
        </Droppable>
      </DragDropContext>

      <div className="todo-filter-control">
        <div className="todos-count">{leftTodoCount} items left</div>

        <div className="control-btn group filter-control-for-desktop">
          <TodoFilterControl
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        </div>

        <div className="control-btn">
          <button className="btn" onClick={clearCompletedTodos}>
            Clear Completed
          </button>
        </div>
      </div>

      <section className="filter-control-for-mobile">
        <div className="control-btn group">
          <TodoFilterControl
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        </div>
      </section>
    </>
  );
};

export default TodoList;

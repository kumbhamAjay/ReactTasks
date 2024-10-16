import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);

 
  useEffect(() => {
    const Todos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(Todos);
  }, []);


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const addTodo = () => {
    if (todo.trim() === "") return; 
    setTodos([...todos, todo]);
    setTodo(""); 
  };


  const startEdit = (index) => {
    setIsEditing(true);
    setCurrentTodoIndex(index);
    setTodo(todos[index]); 
  };

 
  const updateTodo = () => {
    if (todo.trim() === "") return; 
    const updatedTodos = todos.map((item, index) =>
      index === currentTodoIndex ? todo : item
    );
    setTodos(updatedTodos);
    setIsEditing(false); 
    setTodo(""); 
    setCurrentTodoIndex(null);
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Todo App </h1>
      <div>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Enter a todo"
        />
        {isEditing ? (
          <button onClick={updateTodo}>Update Todo</button>
        ) : (
          <button onClick={addTodo}>Add Todo</button>
        )}
      </div>

      <div style={{ marginTop: '20px',display:"flex",flexWrap:"wrap" }}>
        {todos.map((todo, index) => (
          <div key={index} style={{ marginBottom: '10px',display:"flex",justifyContent:"center",alignItems:"center",border:"1px solid ",height:"100px",width:"200px"}}>
            {todo}
            <button onClick={() => startEdit(index)} style={{ marginLeft: '10px' }}>
              Edit
            </button>
            <button onClick={() => removeTodo(index)} style={{ marginLeft: '10px' }}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;

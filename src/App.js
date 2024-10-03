import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAdd = () => {
    if (!input) return;
    setTodos([...todos, { id: Date.now(), text: input }]);
    setInput('');
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (id) => {
    const editingTodo = todos.find(todo => todo.id === id);
    setIsEditing(id);
    setEditText(editingTodo.text);
  };

  const saveEdit = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: editText } : todo
    );
    setTodos(updatedTodos);
    setIsEditing(null);
    setEditText('');
  };

  return (
    <div className="App">
      <h1>To-Do App</h1>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAdd}>Add Task</button>
      </div>
      {todos.length === 0 ? (
        <p>No items found</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {isEditing === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => saveEdit(todo.id)}>Save</button>
                </>
              ) : (
                <>
                  {todo.text}
                  <button onClick={() => handleEdit(todo.id)}>Edit</button>
                  <button onClick={() => handleDelete(todo.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
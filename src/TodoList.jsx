import React, { useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [filter, setFilter] = useState('all');
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  const addTodo = () => {
    if (!taskName.trim()) {
      alert('Task name cannot be empty.');
      return;
    }

    if (editMode) {
  
      const updatedTodos = todos.map((todo) =>
        todo.id === editTodoId ? { ...todo, taskName, taskDescription } : todo
      );
      setTodos(updatedTodos);
      setEditMode(false);
      setEditTodoId(null);
    } else {
      // Add new todo
      const newTodo = {
        id: todos.length + 1,
        taskName,
        taskDescription,
        status: 'not-completed',
      };

      setTodos([...todos, newTodo]);
    }

    clearInputFields();
  };

  const clearInputFields = () => {
    setTaskName('');
    setTaskDescription('');
  };

  const editTodo = (id) => {
    const selectedTodo = todos.find((todo) => todo.id === id);
    setTaskName(selectedTodo.taskName);
    setTaskDescription(selectedTodo.taskDescription);
    setEditMode(true);
    setEditTodoId(id);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleStatus = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, status: todo.status === 'not-completed' ? 'completed' : 'not-completed' }
        : todo
    );
    setTodos(updatedTodos);
  };

  const filterTodos = () => {
    if (filter === 'all') {
      return todos;
    } else {
      return todos.filter((todo) => todo.status === filter);
    }
  };

  return (
    <div>
      <h1>My Todo</h1>

      <label htmlFor="filter"> Status Filter:</label>
      <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="not-completed">Not Completed</option>
      </select>

      <div>
        <h2>{editMode ? 'Edit Todo' : 'Add Todo'}</h2>
        <label htmlFor="task-name">Task Name:</label>
        <input type="text" id="task-name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />

        <label htmlFor="task-description">Description:</label>
        <input
          type="text"
          id="task-description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />

        <button onClick={addTodo}>{editMode ? 'Update Todo' : 'Add Todo'}</button>
      </div>

      <div>
        {filterTodos().map((todo) => (
          <div key={todo.id} className="todo-card">
            <h3>{todo.taskName}</h3>
            <p>{todo.taskDescription}</p>
            <p>
              Status: <span onClick={() => toggleStatus(todo.id)}>{todo.status}</span>
            </p>
            <button onClick={() => editTodo(todo.id)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
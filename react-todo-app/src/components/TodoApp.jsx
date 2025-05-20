import { useState, useEffect } from 'react';
import AddTodo from './AddTodo';
import Filter from './Filter';
import TodoList from './TodoList';

const getInitialTodos = () => {
  const saved = localStorage.getItem('todos');
  return saved ? JSON.parse(saved) : [];
};

const TodoApp = () => {
  const [todos, setTodos] = useState(getInitialTodos);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div className="todo-app">
      <AddTodo onAdd={addTodo} />
      <Filter current={filter} onChange={setFilter} />
      <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
};

export default TodoApp;

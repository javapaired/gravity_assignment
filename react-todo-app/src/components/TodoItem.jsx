const TodoItem = ({ todo, onToggle, onDelete }) => {
    return (
      <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
        <button
          className="check-button"
          onClick={() => onToggle(todo.id)}
          title="Mark Complete/Incomplete"
        >
          {todo.completed ? '✔' : '⬜'}
        </button>
  
        <span className="todo-text">{todo.text}</span>
  
        <button
          className="delete-button"
          onClick={() => onDelete(todo.id)}
          title="Delete Task"
        >
          ❌
        </button>
      </li>
    );
  };
  
  export default TodoItem;
  
import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { toggleTodo, deleteTodo, updateTodoDrawing } from '../features/todos/todosSlice';
import type { Todo } from '../features/todos/todosSlice';
import { DrawingCanvas } from './DrawingCanvas';
import './TodoItem.css';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const [showDrawing, setShowDrawing] = useState(false);
  const [editDrawing, setEditDrawing] = useState(false);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleSaveDrawing = (dataUrl: string) => {
    dispatch(updateTodoDrawing({ id: todo.id, drawing: dataUrl }));
    setEditDrawing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="todo-checkbox"
        />
        <span className="todo-text">{todo.text}</span>
        <div className="todo-actions">
          {todo.drawing && (
            <button
              onClick={() => setShowDrawing(!showDrawing)}
              className="view-drawing-btn"
            >
              {showDrawing ? 'Hide' : 'View'} Drawing
            </button>
          )}
          <button
            onClick={() => setEditDrawing(!editDrawing)}
            className="edit-drawing-btn"
          >
            {todo.drawing && !editDrawing ? 'Edit' : editDrawing ? 'Cancel' : 'Add'} Drawing
          </button>
          <button onClick={handleDelete} className="delete-btn">
            Delete
          </button>
        </div>
      </div>

      {showDrawing && todo.drawing && (
        <div className="drawing-display">
          <img src={todo.drawing} alt="Todo drawing" />
        </div>
      )}

      {editDrawing && (
        <DrawingCanvas onSave={handleSaveDrawing} initialDrawing={todo.drawing} />
      )}
    </div>
  );
};

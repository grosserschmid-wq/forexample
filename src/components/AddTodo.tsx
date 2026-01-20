import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addTodo } from '../features/todos/todosSlice';
import { DrawingCanvas } from './DrawingCanvas';
import './AddTodo.css';

export const AddTodo = () => {
  const [text, setText] = useState('');
  const [showDrawing, setShowDrawing] = useState(false);
  const [drawing, setDrawing] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo({ text: text.trim(), drawing }));
      setText('');
      setDrawing(undefined);
      setShowDrawing(false);
    }
  };

  const handleSaveDrawing = (dataUrl: string) => {
    setDrawing(dataUrl);
    setShowDrawing(false);
  };

  return (
    <div className="add-todo">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button
          type="button"
          onClick={() => setShowDrawing(!showDrawing)}
          className="draw-btn"
        >
          {showDrawing ? 'Hide Drawing' : drawing ? 'Edit Drawing' : 'Add Drawing'}
        </button>
        <button type="submit" className="add-btn">Add Todo</button>
      </form>

      {showDrawing && (
        <DrawingCanvas onSave={handleSaveDrawing} initialDrawing={drawing} />
      )}

      {drawing && !showDrawing && (
        <div className="drawing-preview">
          <img src={drawing} alt="Drawing preview" />
        </div>
      )}
    </div>
  );
};

import { useAppSelector } from '../store/hooks';
import { TodoItem } from './TodoItem';
import './TodoList.css';

export const TodoList = () => {
  const todos = useAppSelector((state) => state.todos.todos);

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos yet! Add one to get started.</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

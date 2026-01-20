import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  drawing?: string; // Base64 encoded image data
}

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ text: string; drawing?: string }>) => {
      state.todos.push({
        id: Date.now().toString(),
        text: action.payload.text,
        completed: false,
        drawing: action.payload.drawing,
      });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    updateTodoDrawing: (state, action: PayloadAction<{ id: string; drawing: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.drawing = action.payload.drawing;
      }
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, updateTodoDrawing } = todosSlice.actions;
export default todosSlice.reducer;

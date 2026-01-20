import { AddTodo } from './components/AddTodo'
import { TodoList } from './components/TodoList'
import { useAppSelector } from './store/hooks'
import './App.css'

function App() {
  const todos = useAppSelector((state) => state.todos.todos)
  const completedCount = todos.filter(todo => todo.completed).length

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Todo List with Drawing</h1>
        <p className="stats">
          {todos.length} total • {completedCount} completed
        </p>
      </header>

      <main className="app-main">
        <AddTodo />
        <TodoList />
      </main>
    </div>
  )
}

export default App

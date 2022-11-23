import './App.css';
import TodoPage from './TodoPage';

import { TodoContext } from './Context/todoContext'

function App() {
  return (
    <TodoContext.Provider value={{
      todoList: []
    }} >
      <div className="App">
        <TodoPage />
      </div>
    </TodoContext.Provider >
  );
}

export default App;

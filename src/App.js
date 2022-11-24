import './App.css';
import TodoPage from './TodoPage';

import { TodoContext } from './Context/todoContext'

function App() {
  return (
    <TodoContext.Provider value={{
      list: []
    }} >
      <div className="App">
        <TodoPage />
      </div>
    </TodoContext.Provider >
  );
}

export default App;

import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import TaskForm from './components/TaskForm/TaskForm.jsx';
import TaskList from './components/TaskList/TaskList.jsx'; 

function App() {
  const [tasks, setTasks] = useState([]);
  return (
    <>
      <Navbar/>
      <TaskForm setTasks={setTasks}/>
      <TaskList tasks={tasks} setTasks={setTasks}/>
    </>
  );
}

export default App;

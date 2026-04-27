import TaskCard from "../TaskCard/TaskCard";
import { useEffect } from "react";
import './TaskList.css';

function TaskList({ tasks, setTasks }) {

  // fetch data from backend
  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.log(err));
  }, [setTasks]); // include setTasks (good practice)

  return (
    <div className="task-list">
      <h2 className="task-list-title">Your Task List</h2>

      {tasks.length === 0 ? (
        <p className="empty">No tasks yet</p>
      ) : (
        <div className="task-grid">
          {tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              setTasks={setTasks}   // 🔥 FIX: pass setTasks
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
import './TaskCard.css';

function TaskCard({ task, setTasks }) {

  async function handleToggle(){
    const updatedTask = {
      ...task,
      done: !task.done
    };

    try{
      await fetch(`http://localhost:5000/tasks/${task.id}`, {
        method: 'PUT', 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(updatedTask)
      });
      setTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));

    } catch (err){
      console.log("Update Failed", err)
    }
  }
  async function handleDelete() {
    try {
      await fetch(`http://localhost:5000/tasks/${task.id}`, {
        method: 'DELETE'
      });

      // 🔥 update UI instantly
      setTasks(prev => prev.filter(t => t.id !== task.id));

    } catch (err) {
      console.log("Delete failed:", err);
    }
  }

  return (
    <div className={`task-card ${task.priority}`}>
      
      <div className="card-header">
        <h3 className={task.done ? "done-title" : ""}>
          {task.title}
        </h3>

        <div className="header-right">
          <span className={`priority ${task.priority}`}>
            {task.priority}
          </span>

          {task.done && <span className="done-badge">✔</span>}
        </div>
      </div>

      <p className="desc">
        {task.description || "No description"}
      </p>

      <p className="date">
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "No date"}
      </p>

      <button className='btn-complete' onClick={handleToggle}>{
        task.done ? "undo": "Complete"
      }</button>

      <button className="delete-btn" onClick={handleDelete}>
        Delete
      </button>

    </div>
  );
}

export default TaskCard;
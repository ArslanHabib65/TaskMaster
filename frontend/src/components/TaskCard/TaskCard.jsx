import './TaskCard.css';

function TaskCard({ task, setTasks }) {

  // COMPLETE / UNDO TASK
  async function handleToggle() {

    const token = localStorage.getItem('token');

    const updatedTask = {
        ...task,
        done: !task.done,
        dueDate: task.dueDate
          ? new Date(task.dueDate)
              .toISOString()
              .split('T')[0]
          : null
      };

    try {

      const response = await fetch(
        `http://localhost:5000/tasks/${task.id}`,
        {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(updatedTask)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      // update frontend instantly
      setTasks(prev =>
        prev.map(t =>
          t.id === task.id ? updatedTask : t
        )
      );

    } catch (err) {
      console.log("Update Failed:", err);
    }
  }

  // DELETE TASK
  async function handleDelete() {

    const token = localStorage.getItem('token');

    try {

      const response = await fetch(
        `http://localhost:5000/tasks/${task.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      // remove task from frontend instantly
      setTasks(prev =>
        prev.filter(t => t.id !== task.id)
      );

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

          {task.done && (
            <span className="done-badge">✔</span>
          )}

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

      <button
          className='btn-complete'
          onClick={handleToggle}
      >
          {task.done ? "Completed ✓" : "Complete"}
      </button>

      <button
        className="delete-btn"
        onClick={handleDelete}
      >
        Delete
      </button>

    </div>
  );
}

export default TaskCard;
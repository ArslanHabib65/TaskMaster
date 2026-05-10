import TaskCard from "../TaskCard/TaskCard";
import { useEffect } from "react";
import './TaskList.css';

function TaskList({ tasks, setTasks }) {

    useEffect(() => {

        const token = localStorage.getItem('token');

        // Stop fetch if user not logged in
        if (!token){
            setTasks([]);
            return;
        }

        fetch(
            "http://localhost:5000/tasks",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(res => res.json())
        .then(data => {

            // Protect against backend error objects
            if (Array.isArray(data)){
                setTasks(data);
            } else {
                setTasks([]);
            }

        })
        .catch(err => {
            console.log(err);
            setTasks([]);
        });

    }, [setTasks]);

    return (
        <div className="task-list">

            <h2 className="task-list-title">
                Your Task List
            </h2>

            {tasks.length === 0 ? (

                <p className="empty">
                    No tasks yet
                </p>

            ) : (

                <div className="task-grid">

                    {tasks.map(task => (

                        <TaskCard
                            key={task.id}
                            task={task}
                            setTasks={setTasks}
                        />

                    ))}

                </div>

            )}

        </div>
    );
}

export default TaskList;
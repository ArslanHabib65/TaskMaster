import TaskCard from "../TaskCard/TaskCard";
import { useEffect, useState } from "react";
import './TaskList.css';

function TaskList({ tasks, setTasks }) {

    const [showOverdue, setShowOverdue] = useState(false);

    const [showCalendar, setShowCalendar] = useState(false);

    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {

        const token = localStorage.getItem('token');

        // stop fetch if user not logged in
        if (!token) {
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

            // protect against backend errors
            if (Array.isArray(data)) {
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



    // today's date
    const today = new Date().toISOString().split('T')[0];



    // today tasks
    const todayTasks = tasks.filter(task =>
        task.dueDate &&
        task.dueDate.split('T')[0] === today &&
        !task.done
    );



    // overdue tasks
    const overdueTasks = tasks.filter(task =>
        task.dueDate &&
        task.dueDate.split('T')[0] < today &&
        !task.done
    );



    // selected date tasks
    const selectedDateTasks = tasks.filter(task =>
        task.dueDate &&
        task.dueDate.split('T')[0] === selectedDate
    );



    return (

        <div className="task-list">

            <h2 className="task-list-title">
                Your Task List
            </h2>



            {/* TODAY TASKS */}

            {todayTasks.length === 0 ? (

                <p className="empty">
                    No tasks for today
                </p>

            ) : (

                <div className="task-grid">

                    {todayTasks.map(task => (

                        <TaskCard
                            key={task.id}
                            task={task}
                            setTasks={setTasks}
                        />

                    ))}

                </div>

            )}



            {/* OVERDUE SECTION */}

            {overdueTasks.length > 0 && (

                <div className="overdue-container">

                    <p className="overdue-warning">
                        ⚠ You have {overdueTasks.length} overdue tasks
                    </p>

                    <button
                        className="overdue-btn"
                        onClick={() => setShowOverdue(!showOverdue)}
                    >
                        {showOverdue
                            ? "Hide Overdue Tasks"
                            : "Show Overdue Tasks"}
                    </button>

                </div>

            )}



            {/* OVERDUE TASKS */}

            {showOverdue && overdueTasks.length > 0 && (

                <>

                    <h2 className="overdue-title">
                        Overdue Tasks
                    </h2>

                    <div className="task-grid">

                        {overdueTasks.map(task => (

                            <TaskCard
                                key={task.id}
                                task={task}
                                setTasks={setTasks}
                            />

                        ))}

                    </div>

                </>

            )}



            {/* CALENDAR BUTTON */}

            <div className="calendar-toggle">

                <button
                    className="calendar-btn"
                    onClick={() => setShowCalendar(!showCalendar)}
                >
                    {showCalendar
                        ? "Hide Calendar Tasks"
                        : "View Tasks By Date"}
                </button>

            </div>



            {/* CALENDAR SECTION */}

            {showCalendar && (

                <div className="calendar-section">

                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) =>
                            setSelectedDate(e.target.value)
                        }
                    />

                    <h2 className="overdue-title">
                        Tasks For {selectedDate || "Selected Date"}
                    </h2>



                    {selectedDateTasks.length === 0 ? (

                        <p className="empty">
                            No tasks for this date
                        </p>

                    ) : (

                        <div className="task-grid">

                            {selectedDateTasks.map(task => (

                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    setTasks={setTasks}
                                />

                            ))}

                        </div>

                    )}

                </div>

            )}

        </div>
    );
}

export default TaskList;
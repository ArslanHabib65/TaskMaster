import { useState } from 'react';
import './TaskForm.css';

function TaskForm({ setTasks, disabled = false }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [dueDate, setDueDate] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState(null);

    function sortTasks(tasks) {
        const priorityOrder = {
            high: 1,
            medium: 2,
            low: 3
        };

        return [...tasks].sort((a, b) => {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (disabled) {
            alert("Please login to use TaskMaster");
            return;
        }

        setIsSaving(true);

        try {

            const token = localStorage.getItem('token');

            const response = await fetch(
                'http://localhost:5000/tasks',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        title,
                        description,
                        priority,
                        done: false,
                        dueDate: dueDate || null
                    })
                }
            );

            const data = await response.json();

            // STOP if backend failed
            if (!response.ok) {

                setMessage(data.message || 'Failed to add task');
                setIsSaving(false);
                return;
            }

            // ONLY add after successful backend insert
            setTasks(prev =>
                sortTasks([
                    ...prev,
                    {
                        id: data.id,
                        title,
                        description,
                        priority,
                        dueDate
                    }
                ])
            );

            console.log('Backend said:', data);

            setTitle('');
            setDescription('');
            setPriority('medium');
            setDueDate('');
            setMessage(null);

        } catch (error) {

            console.log(error);
            setMessage('Server Error');

        } finally {

            setIsSaving(false);
        }
    }
    return (
        <>
        {/* type attribute from button going to trig the onSubmit property */}
            <form className="task-form" onSubmit={handleSubmit}>
                <h3 className='heading'>Fill your task form efficiently to stay Productive</h3>

                <div className='title'>
                    <h4 className='title-label'>Title</h4>
                    <input 
                        type="text"
                        placeholder='Enter task title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={disabled}
                    />
                </div>

                <div className='description'>
                    <h4>Description</h4>
                    <textarea
                        id="description"
                        placeholder="Enter a description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        disabled={disabled}
                    />
                </div>

                <div className='priority'>
                    <h4>Priority Level</h4>
                    <select 
                        className='priority-option'
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        disabled={disabled}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                
                <div className='dueDate'>
                <h4>Due Date</h4>
                    <input 
                        type="date" 
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        disabled={disabled}
                    />
                </div>
                <button
                    className='submit-btn'
                    type="submit"
                    disabled={isSaving || disabled}
                >
                    {
                        disabled
                        ? 'Login to Add Task'
                        : isSaving
                        ? 'Saving...'
                        : 'Add Task'
                    }
                </button>
            </form>

        </>
    );
}

export default TaskForm;
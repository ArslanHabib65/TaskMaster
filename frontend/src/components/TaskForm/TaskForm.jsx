import {use, useState} from 'react';
import './TaskForm.css';

function TaskForm(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [dueDate, setDueDate] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        
        const response = await fetch('http://localhost:5000/tasks', {
            method: 'Post', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                title, 
                description, 
                priority,
                done: false, 
                dueDate: dueDate || null
            })
        });
        const data = await response.json();
        console.log('Backend said:', data);

        // Reset form
        setTitle('');
        setDescription('');
        setPriority('medium');
        setDueDate('');
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
                    />
                </div>

                <div className='priority'>
                    <h4>Priority Level</h4>
                    <select 
                        className='priority-option'
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
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
                    />
                </div>


                <button className='submit-btn' type="submit">Add Task</button>  
            </form>

        </>
    );
}

export default TaskForm;
import React, { useEffect, useState } from 'react';
import "../pages/dashboard.scss";

const Dashboard = ({ user }) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const tasksKey = `${user.email}-tasks`;

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem(tasksKey)) || [];
        setTasks(savedTasks);
    }, [tasksKey]);

    const saveTasks = (updatedTasks) => {
        setTasks(updatedTasks);
        localStorage.setItem(tasksKey, JSON.stringify(updatedTasks));
    };

    const AddTask = () => {
        if (!newTask.trim()) return;
        const newTaskObj = { id: Date.now(), text: newTask, completed: false };
        const updatedTasks = [...tasks, newTaskObj];
        saveTasks(updatedTasks);
        setNewTask('');
    };

    const EditTask = (index) => {
        setNewTask(tasks[index].text);
        setEditIndex(index);
    };

    const UpdateTask = () => {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex].text = newTask;
        saveTasks(updatedTasks);
        setNewTask('');
        setEditIndex(null);
    };

    const DeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        saveTasks(updatedTasks);
    };

    const ToggleCompleteTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        saveTasks(updatedTasks);
    };

    const ClearAll = () => {
        setTasks([]);
        localStorage.removeItem(tasksKey);
    };

    return (
        <div className="dashboard">
            <div className="todo-section">
                <h2 className='text-center'>Add your Task</h2>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                />
                {editIndex !== null ? (
                    <button onClick={UpdateTask}>Update</button>
                ) : (
                    <button onClick={AddTask}>Add</button>
                )}

                <ul>
                    {tasks.map((task, index) => (
                        <li key={task.id} style={{
                            textDecoration: task.completed ? 'line-through' : 'none',
                            backgroundColor: task.completed ? 'lightgreen' : 'inherit'
                        }}>
                            {task.text}
                            <button onClick={() => EditTask(index)} className='edit'>Edit</button>
                            <button onClick={() => ToggleCompleteTask(index)} className='complete'>
                                {task.completed ? 'Undo' : 'Complete'}
                            </button>
                            <button onClick={() => DeleteTask(index)} className='delete'>Delete</button>
                        </li>
                    ))}
                </ul>

                <div className='d-flex justify-content-center'>
                    <button className='btn btn-danger' onClick={ClearAll}>Clear all tasks</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

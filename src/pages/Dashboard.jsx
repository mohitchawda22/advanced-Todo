import React, { useEffect, useState } from 'react';
import "../pages/dashboard.scss";

const Dashboard = ({ user }) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const tasksKey = 'all-tasks'; 

    useEffect(() => {
        const allTasks = JSON.parse(localStorage.getItem(tasksKey)) || [];
        const userTasks = allTasks.filter(task => task.userId === user.id) // this is filter the current user task from the alltask array
        setTasks(userTasks);
    }, [user.id]);

    const saveTasks = (updatedTasks) => {
        const allTasks = JSON.parse(localStorage.getItem(tasksKey)) || [];
        const updatedAllTasks = allTasks.filter(task => task.userId !== user.id); // this is remove al the task that belong to current user and will replace with the new one 
        updatedAllTasks.push(...updatedTasks); 
        localStorage.setItem(tasksKey, JSON.stringify(updatedAllTasks));
        setTasks(updatedTasks);
    };

    const AddTask = () => {
        if (!newTask.trim()) return;
        const newTaskObj = { userId: user.id, text: newTask, completed: false }; 
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
        const updatedTasks = tasks.filter((v, i) => i !== index);
        saveTasks(updatedTasks);
    };

    const CompleteTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        saveTasks(updatedTasks);
    };

    const ClearAll = () => {
        setTasks([]);
        const allTasks = JSON.parse(localStorage.getItem(tasksKey)) || [];
        const updatedAllTasks = allTasks.filter(task => task.userId !== user.id);
        localStorage.setItem(tasksKey, JSON.stringify(updatedAllTasks));
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

                <h3 className='text-center'>Your Tasks</h3>
                {tasks.filter(task => !task.completed).length === 0 ? (
                    <p className='text-center'>No tasks available</p>
                ) : (
                    <ul>
                        {tasks.filter(task => !task.completed).map((task, index) => (
                            <li key={index}>
                                {task.text}
                                <button onClick={() => EditTask(index)} className='edit'>Edit</button>
                                <button onClick={() => CompleteTask(index)} className='complete'>
                                    Complete
                                </button>
                                <button onClick={() => DeleteTask(index)} className='delete'>Delete</button>
                            </li>
                        ))}
                    </ul>
                )}

                <h3 className='text-center'>Completed Tasks</h3>
                {tasks.filter(task => task.completed).length === 0 ? (
                    <p className='text-center'>No tasks completed yet</p>
                ) : (
                    <ul>
                        {tasks.filter(task => task.completed).map((task, index) => (
                            <li key={index} style={{ textDecoration: 'line-through', backgroundColor: 'lightgreen' }}>
                                {task.text}
                                <button onClick={() => CompleteTask(index)} className='undo'>
                                    Undo
                                </button>
                                <button onClick={() => DeleteTask(index)} className='delete'>Delete</button>
                            </li>
                        ))}
                    </ul>
                )}

                <div className='d-flex justify-content-center'>
                    <button className='btn btn-danger' onClick={ClearAll}>Clear all tasks</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

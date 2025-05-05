import React, { useEffect, useState } from 'react';
import "../pages/dashboard.scss";

const Dashboard = ({ user }) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);

    const tasksKey = 'all-tasks';

    useEffect(() => {
        const allTasks = JSON.parse(localStorage.getItem(tasksKey)) || [];
        const userTasks = allTasks.filter(task => task.userId === user.id);
        setTasks(userTasks);
    }, [user.id]);

    const saveTasks = (updatedTasks) => {
        const allTasks = JSON.parse(localStorage.getItem(tasksKey)) || [];
        const updatedAllTasks = allTasks.filter(task => task.userId !== user.id);
        updatedAllTasks.push(...updatedTasks);
        localStorage.setItem(tasksKey, JSON.stringify(updatedAllTasks));
        setTasks(updatedTasks);
    };

    const AddTask = () => {
        if (!newTask.trim()) return;
        const newTaskObj = {
            userId: user.id,
            taskId: Math.floor(Math.random() * 1000000), //this give unique id's to the todo task 
            text: newTask,
            completed: false
        };
        const updatedTasks = [...tasks, newTaskObj];
        saveTasks(updatedTasks);
        setNewTask('');
    };

    const EditTask = (taskId) => {
        const taskToEdit = tasks.find(task => task.taskId === taskId);
        if (taskToEdit) {
            setNewTask(taskToEdit.text);
            setEditTaskId(taskId);
        }
    };

    const UpdateTask = () => {
        const updatedTasks = tasks.map(task =>
            task.taskId === editTaskId ? { ...task, text: newTask } : task
        );
        saveTasks(updatedTasks);
        setNewTask('');
        setEditTaskId(null);
    };

    const DeleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.taskId !== taskId);
        saveTasks(updatedTasks);
    };

    const CompleteTask = (taskId) => {
        const updatedTasks = tasks.map(task =>
            task.taskId === taskId ? { ...task, completed: !task.completed } : task
        );
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
                {editTaskId !== null ? (
                    <button onClick={UpdateTask}>Update</button>
                ) : (
                    <button onClick={AddTask}>Add</button>
                )}

                <h3 className='text-center'>Your Tasks</h3>
                {tasks.filter(task => !task.completed).length === 0 ? (
                    <p className='text-center'>No tasks available</p>
                ) : (
                    <ul>
                        {tasks.filter(task => !task.completed).map((task) => (
                            <li key={task.taskId}>
                                {task.text}
                                <button onClick={() => EditTask(task.taskId)} className='edit'>Edit</button>
                                <button onClick={() => CompleteTask(task.taskId)} className='complete'>
                                    Complete
                                </button>
                                <button onClick={() => DeleteTask(task.taskId)} className='delete'>Delete</button>
                            </li>
                        ))}
                    </ul>
                )}

                <h3 className='text-center'>Completed Tasks</h3>
                {tasks.filter(task => task.completed).length === 0 ? (
                    <p className='text-center'>No tasks completed yet</p>
                ) : (
                    <ul>
                        {tasks.filter(task => task.completed).map((task) => (
                            <li key={task.taskId} style={{ textDecoration: 'line-through', backgroundColor: 'lightgreen' }}>
                                {task.text}
                                <button onClick={() => CompleteTask(task.taskId)} className='undo'>
                                    Undo
                                </button>
                                <button onClick={() => DeleteTask(task.taskId)} className='delete'>Delete</button>
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

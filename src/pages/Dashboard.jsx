import React, { useState } from 'react'

function Dashboard({user}) {
    const [task,setTask]=useState([])
    const [completeTasks,setCompleteTasks]=useState([])
    const[newTask,setNewTask]=useState('')
    const [editTask,setEditTask]=useState(null)

    const addTask=()=>{
        if(!task.trim()) return
        const updatedTask=[...task,task.trim()]
        setTask(updatedTask)
        localStorage.setItem(user,JSON.stringify(updatedTask))
        setTask('')
    }

    const deletetTask=(index)=>{
        const updatedTask=task.filter((v,i)=>i!==index)
        setTask(updatedTask)
        localStorage.setItem(user,JSON.stringify(updatedTask))
    }

    const edittask=(index)=>{
        setTask(task[index])
        setEditTask(index)
    }

    const completetask=(index)=>{
        const completedTask=task[index]
        const updatedTask=task.filter((v,i)=>i==index)
        const upadatedCompleted=[...completeTasks,completedTask]
        setTask(updatedTask)
        setCompleteTasks(upadatedCompleted)
        localStorage.setItem(user,JSON.stringify(updatedTask))
        localStorage.setItem(user,JSON.stringify(upadatedCompleted))
    }

    const handleUpdateTask=()=>{
        const Updated=[...task]
        Updated[editTask]=newTask
        setTask(Updated)
        localStorage.setItem(user,JSON.stringify(Updated))
        setNewTask('');
        setEditTask(null);
    }

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name} 🎉</h1>
        <div>
            <h2>Add your Task:</h2>
            <input type="text" name="todo" placeholder='Add your task' value={newTask} onChange={(e)=>setNewTask(e.target.value)} />
            <button>Add</button>
            {!editTask && <button onClick={handleUpdateTask}>Update</button>}
        </div>
    </div>
  )
}

export default Dashboard

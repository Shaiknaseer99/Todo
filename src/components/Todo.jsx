import React from 'react';
import './todo.css'
import { useState, useEffect } from 'react';

function Todo() {
    const [task, setTask] = useState("");
    const [displayTask, setDisplayTask] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const LOCAL_STORAGE_KEY = "tasks";

  
    useEffect(() => {
        const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedTasks) {
            console.log("Loaded tasks from local storage:", JSON.parse(storedTasks));
            setDisplayTask(JSON.parse(storedTasks));
        }
    }, []);

    
    useEffect(() => {
        console.log("Saving tasks to local storage:", displayTask);
        if (displayTask.length > 0) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(displayTask));
        } else {
            localStorage.removeItem(LOCAL_STORAGE_KEY); 
        }
    }, [displayTask]);

    function addTask() {
        if (task.trim() === "") {
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
            return;
        }

        setDisplayTask((displayTask) => {
            const updatedData = [...displayTask, task];
            setTask("");
            return updatedData;
        });
    }

    function removeTask(i) {
        const updatedlist = displayTask.filter((ele, id) => i !== id);
        setDisplayTask(updatedlist);
    }

    function removeAllTask() {
        setDisplayTask([]);
    }

    return (
        <>
            <div className='todo-wrapper'>
                <div className='todo-heading'>
                    <h3>TODO LIST</h3>
                </div>
                {showNotification && (
                    <div className='notification'>
                        Task cannot be empty!
                    </div>
                )}
                <div className='todo-input'>
                    <input
                        type="text"
                        id="todo-input"
                        placeholder='Enter your Task'
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <button onClick={addTask}>ADD</button>
                </div>
                <div className='displayData'>
                    <p className='description'>Your Todo List</p>
                    {displayTask.length > 0 && displayTask.map((data, i) => (
                        <p key={i}>
                            <div>
                                {data}
                            </div>
                            <div className='Remove-btn'>
                                <button onClick={() => removeTask(i)}>Remove</button>
                            </div>
                        </p>
                    ))}
                </div>
                {displayTask.length > 1 && (
                    <div className='remove-all'>
                        <button onClick={removeAllTask}>RemoveAll</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Todo;

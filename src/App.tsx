import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    const todoListTitle = "What to learn"

    let [tasks, setTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])

    const removeTask = (id: number) => {
        let filteredTask = tasks.filter(task => task.id !== id)
        setTasks(filteredTask)
    }

    let [filter, setFilter] = useState("all")
    let tasksForTodoList = tasks

    if(filter === "active") {
        tasksForTodoList = tasks.filter(t=>!t.isDone)
    }
    if(filter === "completed") {
        tasksForTodoList = tasks.filter(t=>t.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title={todoListTitle}
                tasks={tasksForTodoList}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;

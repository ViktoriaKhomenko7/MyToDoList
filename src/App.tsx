import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterValueType = "all" | "active" | "completed"

function App() {

    const todoListTitle = "What to learn"

    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false }
    ])
    console.log(tasks[0].id)

    const addTask = (title: string) => {
        let task =  { id: v1(), title: title, isDone: false }
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }
    const removeTask = (id: string) => {
        let filteredTask = tasks.filter(task => task.id !== id)
        setTasks(filteredTask)
    }

    let [filter, setFilter] = useState<"all" | "active" | "completed">("all")
    let tasksForTodoList = tasks

    if(filter === "active") {
        tasksForTodoList = tasks.filter(t=>!t.isDone)
    }
    if(filter === "completed") {
        tasksForTodoList = tasks.filter(t=>t.isDone)
    }

    const changeFilter = (value: FilterValueType) => {     // когда и почему мы пишем value?
        setFilter(value)
    }
    const changeTaskStatus = (id: string, isDone: boolean) => {
        let task = tasks.find(t=> t.id === id)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    return (
        <div className="App">
            <Todolist
                title={todoListTitle}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;

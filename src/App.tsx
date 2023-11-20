import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterValueType = "all" | "active" | "completed"

type TodoListsType = {
    id: string
    title: string
    filter: string
}

function App() {

    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false }
    ])

    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }
    const removeTask = (id: string) => {
        let filteredTask = tasks.filter(task => task.id !== id)
        setTasks(filteredTask)
    }


    const changeTaskStatus = (id: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }
    const changeFilter = (value: FilterValueType, todoListId: string) => {
        let todoList = todoLists.find(el => el.id === todoListId)
        if (todoList) {
            todoList.filter = value
        }
        setTodoLists([...todoLists])
    }

    let [todoLists, setTodoLists] = useState<TodoListsType[]>(
        [
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'all'},
        ]
    )

    return (
        <div className="App">
            {
                todoLists.map(el => {
                    let tasksForTodoList = tasks;

                    if (el.filter === "active") {
                        tasksForTodoList = tasks.filter(t => !t.isDone);
                    }
                    if (el.filter === "completed") {
                        tasksForTodoList = tasks.filter(t => t.isDone);
                    }
                    return <Todolist
                        id={el.id}
                        key={el.id}
                        title={el.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={el.filter}
                    />
                })
            }
        </div>
    );
}

export default App;

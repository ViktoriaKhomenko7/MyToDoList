import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterValueType = "all" | "active" | "completed"

type TodoListsType = {
    id: string
    title: string
    filter: string
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}
function App() {

    let todoList1 = v1()
    let todoList2 = v1()

    let [todoLists, setTodoLists] = useState<TodoListsType[]>(
        [
            {id: todoList1, title: 'What to learn', filter: 'all'},
            {id: todoList2, title: 'What to buy', filter: 'all'},
        ]
    );

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todoList1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todoList2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Water", isDone: false}
        ]
    })

    const addTask = (title: string, todoListId: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todoListId]
        let newTasks = [task, ...tasks]
        tasksObj[todoListId] = newTasks
        setTasks({...tasksObj})
    }

    const removeTask = (id: string, todoListId: string) => {
        let tasks = tasksObj[todoListId]
        let filteredTask = tasks.filter(task => task.id !== id)
        tasksObj[todoListId] = filteredTask
        setTasks({...tasksObj})
    }

    const changeTaskStatus = (id: string, isDone: boolean, todoListId: string) => {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj})
        }
    }
    const changeFilter = (value: FilterValueType, todoListId: string) => {
        let todoList = todoLists.find(el => el.id === todoListId)
        if (todoList) {
            todoList.filter = value
        }
        setTodoLists([...todoLists])
    }

    let removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(el => el.id !== todoListId)
        setTodoLists(filteredTodoList)

        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }


    return (
        <div className="App">
            {
                todoLists.map(el => {
                    let tasksForTodoList = tasksObj[el.id];

                    if (el.filter === "active") {
                        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone);
                    }
                    if (el.filter === "completed") {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone);
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
                        removeTodoList={removeTodoList}
                        filter={el.filter}
                    />
                })
            }
        </div>
    );
}

export default App;

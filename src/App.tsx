import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {ButtonAppBar} from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";

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
        let todoListTasks = tasksObj[todoListId]
        tasksObj[todoListId] = [task, ...todoListTasks]
        setTasks({...tasksObj})
    }

    // function addTask(title: string, todolistId: string) {
    //     let task = {id: v1(), title: title, isDone: false};
    //     //достанем нужный массив по todolistId:
    //     let todolistTasks = tasks[todolistId];
    //     // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
    //     tasks[todolistId] = [task, ...todolistTasks];
    //     // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    //     setTasks({...tasks});
    // }

    const removeTask = (id: string, todoListId: string) => {
        let todoListsTasks = tasksObj[todoListId]
        tasksObj[todoListId] = todoListsTasks.filter(el => el.id !== id)
        setTasks({...tasksObj})
    }

    // function removeTask(id: string, todolistId: string) {
    //     //достанем нужный массив по todolistId:
    //     let todolistTasks = tasks[todolistId];
    //     // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
    //     tasks[todolistId] = todolistTasks.filter(t => t.id != id);
    //     // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    //     setTasks({...tasks});
    // }

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

    const removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(el => el.id !== todoListId)
        setTodoLists(filteredTodoList)

        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }

    const AddTodoList = (title: string) => {
        let todoList: TodoListsType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodoLists([todoList, ...todoLists])
        setTasks({...tasksObj, [todoList.id]: []})
    }

    const changeTaskTitle = (id: string, newTitle: string, todoListId: string) => {
        //достаем нужный массив по todoListId
        let todoListTasks = tasksObj[todoListId]
        //находим нужную таску
        let task = todoListTasks.find(t => t.id === id)
        //если она нашлась, изменим ее
        if (task) {
            task.title = newTitle;
            setTasks({...tasksObj})
        }
    }

    const changeTodoListTitle = (id: string, newTitle: string) => {
        const todoList = todoLists.find(el => el.id === id)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={AddTodoList}/>
                </Grid>
                <Grid container>
                    {
                        todoLists.map(el => {
                            let tasksForTodoList = tasksObj[el.id];

                            if (el.filter === "active") {
                                tasksForTodoList = tasksForTodoList.filter(t => !t.isDone);
                            }
                            if (el.filter === "completed") {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone);
                            }
                            return <Paper elevation={3} style={{padding: "20px", margin: "20px"}}>
                            <Todolist
                                id={el.id}
                                key={el.id}
                                title={el.title}
                                tasks={tasksForTodoList}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                removeTodoList={removeTodoList}
                                changeTaskTitle={changeTaskTitle}
                                changeTodoListTitle={changeTodoListTitle}
                                filter={el.filter}
                            />
                            </Paper>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;

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
    filter: FilterValueType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todoListsID1 = v1()
    let todoListsID2 = v1()

    let [todoLists, setTodoLists] = useState<TodoListsType[]>(
        [
            {id: todoListsID1, title: 'What to learn', filter: 'all'},
            {id: todoListsID2, title: 'What to buy', filter: 'all'},
        ]
    );

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListsID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todoListsID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Water", isDone: false}
        ]
    })

    // const addTask = (todoListId: string, title: string) => {
    //     let newTask = {id: v1(), title: title, isDone: false};
    //     setTasks({...tasks, [todoListId]: [newTask,...tasks[todoListId]]})
    //
    // }

    // function removeTask(todoListId: string, taskId: string) {
    //     setTasks({...tasks, [todoListId] : tasks[todoListId].filter(el=>el.id !== taskId)})
    // }

    const removeTask = (id: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t=>t.id !== id)})
    }

    const addTask = (title: string, todolistId: string)=> {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
    }

    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todoListId]:tasks[todoListId].map(el=>el.id === taskId ? {...el, isDone} : el)})
    }

    const changeFilter = (todoListId: string, value: FilterValueType) => {
        setTodoLists(todoLists.map(el=>el.id === todoListId ? {...el, filter: value} : el))
    }

    const removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(el => el.id !== todoListId)
        setTodoLists(filteredTodoList)

        delete tasks[todoListId]
        setTasks({...tasks})
    }

    const AddTodoList = (title: string) => {
        let newTodoList: TodoListsType = {id: v1(), title: title, filter: "all"}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoList.id]: []})
    }

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title} :el)})
    }

    const changeTodoListTitle = (todolistId: string, title: string) => {
        setTodoLists(todoLists.map(el=>el.id === todolistId ? {...el, title}:el))
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
                            let tasksForTodoList = tasks[el.id];

                            if (el.filter === "active") {
                                tasksForTodoList = tasks[el.id].filter(t => !t.isDone);
                            }
                            if (el.filter === "completed") {
                                tasksForTodoList = tasks[el.id].filter(t => t.isDone);
                            }
                            return <Paper elevation={3} style={{padding: "20px", margin: "20px"}}>
                                <Todolist
                                    id={el.id}
                                    key={el.id}
                                    todoListsID={el.id}
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

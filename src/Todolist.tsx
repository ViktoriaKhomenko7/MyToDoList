import React, {ChangeEvent} from 'react'
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    todoListsID: string
    title: string
    tasks: TaskType[]
    removeTask: (todoListId: string, id: string) => void
    changeFilter: (todoListId: string, value: FilterValueType) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, id: string, isDone: boolean) => void
    removeTodoList: (id: string) => void
    changeTaskTitle: (todoListId: string, id: string, newTitle: string) =>void
    changeTodoListTitle: (id: string, newTitle: string) => void
    filter: string
}
export const Todolist = (props: TodolistPropsType) => {

    const onAllClickHandler = () => props.changeFilter(props.todoListsID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todoListsID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todoListsID, "completed");
    const removeTodolistHandler = () => props.removeTodoList(props.id)
    const addTask = (title: string) => props.addTask(title, props.id)
    const changeTodoListTitle = (newTitle: string) => props.changeTodoListTitle(props.id, newTitle)

    return <div>
        <h3> <EditableSpan
            title={props.title}
            onChange={changeTodoListTitle}/>
            {/*<button onClick={removeTodolistHandler}>x</button>*/}

            <IconButton onClick={removeTodolistHandler} aria-label="delete">
                <DeleteIcon fontSize="inherit" />
            </IconButton>

        </h3>
        <AddItemForm addItem={addTask}
        />
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(props.todoListsID, t.id, newIsDoneValue);
                    }

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangeStatusHandler}
                                  checked={t.isDone}
                                  size="small"
                        />
                        <EditableSpan
                            title={t.title}
                            onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onClickHandler} aria-label="delete" size="small">
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button onClick={onAllClickHandler} color='primary' variant={props.filter === 'all' ? "outlined" : "contained"}>All</Button>
            <Button onClick={onActiveClickHandler} color='primary' variant={props.filter === 'active' ? "outlined" : "contained"}>Active</Button>
            <Button onClick={onCompletedClickHandler} color='primary' variant={props.filter === 'completed' ? "outlined" : "contained"}>Completed</Button>
        </div>
    </div>
}


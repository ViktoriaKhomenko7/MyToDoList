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
    title: string
    tasks: TaskType[]
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValueType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (id: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) =>void
    changeTodoListTitle: (id: string, newTitle: string) => void
    filter: string
}
export const Todolist = (props: TodolistPropsType) => {

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodolistHandler = () => props.removeTodoList(props.id)
    const addTask = (title: string) => props.addTask(title, props.id)
    const changeTodoListTitle = (newTitle: string) =>{
        props.changeTodoListTitle(props.id, newTitle)
    }

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
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*<input*/}
                        {/*    type="checkbox"*/}
                        {/*    onChange={onChangeStatusHandler}*/}
                        {/*    checked={t.isDone}/>*/}
                        <Checkbox onChange={onChangeStatusHandler}
                                  checked={t.isDone}
                                  size="small"
                        />
                        <EditableSpan
                            title={t.title}
                            onChange={onChangeTitleHandler}/>
                        {/*<button onClick={onClickHandler}>x</button>*/}
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
            {/*<button className={props.filter === 'all' ? "active-filter" : ""}*/}
            {/*        onClick={onAllClickHandler}>All*/}
            {/*</button>*/}
            {/*<button className={props.filter === 'active' ? "active-filter" : ""}*/}
            {/*        onClick={onActiveClickHandler}>Active*/}
            {/*</button>*/}
            {/*<button className={props.filter === 'completed' ? "active-filter" : ""}*/}
            {/*        onClick={onCompletedClickHandler}>Completed*/}
            {/*</button>*/}
        </div>
    </div>
}


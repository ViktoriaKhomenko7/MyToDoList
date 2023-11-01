import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterValueType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: string
}
export const Todolist = (props: TodolistPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim())
            setTitle("")
        } else {
            setError("Title is required")
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === "Enter") {
            addTask()
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                { error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onClickHandler = () => {
                        props.removeTask(t.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked)
                    }
                    return (
                        <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
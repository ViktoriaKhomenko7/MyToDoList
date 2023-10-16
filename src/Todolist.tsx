import React from 'react';


type TasksType = {
    id: number
    title: string
    isDone: boolean
}
type TasksPropsType = {
    title: string
    tasks: TasksType[]
}
export const Todolist = (props: TasksPropsType) => {

    const tasks = props.tasks.map((el, index) => {
        return (
            <li key={el.id}>
                <input type='checkbox' checked={el.isDone}/>
                <span>{props.title}</span>
            </li>
        )
    })

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasks}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    )
};
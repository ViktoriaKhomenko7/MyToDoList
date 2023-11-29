import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim())
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

    //можно stylesComponents или вынести в отдельный файл
    const buttonStyles = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px'
    }

    return (
        <div>
            <TextField
                id="outlined-basic"
                label={error ? error : "Type text here..."}
                variant="outlined"
                size="small"
                error={!!error}
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
            />
            {/*<input*/}
            {/*    value={title}*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    onKeyDown={onKeyDownHandler}*/}
            {/*    className={error ? "error" : ""}*/}
            {/*/>*/}
            {/*<button onClick={addTask}>+</button>*/}

            <Button onClick={addTask} style={buttonStyles} variant="contained">+</Button>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
};


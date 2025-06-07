import { useState, useEffect, useRef, Fragment } from "react";
import { nanoid } from "nanoid";
import { ListContext } from "./ListContext";
import { List } from "./List";
import { BiTask } from "react-icons/bi";
import './form.css'
export const Form = () => {
    const [list, setList] = useState(() => {
        const savedList = localStorage.getItem("list")
        return savedList ? JSON.parse(savedList) : []
    })
    const [task, setTask] = useState(() => {
        return localStorage.getItem("task") || ""
    })
    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(list))
    }, [list])
    const handleInputTask = (e) => {
        setTask(e.target.value)
    }
    const inputRef = useRef();
    const handleSend = () => {
        if (!task.trim()) {
            alert("Заповніть полe!");
            return;
        }
        if (list.length >= 100) {
            alert("Максимум 100 задач");
            return;
        }
        const update = [...list, { tasks: task, id: nanoid(), checked: false }]
        setList(update)
        setTask("")
        inputRef.current.focus()
    }
    const handleDelete = (id) => {
        const deleteItem = list.filter(listDelete => listDelete.id !== id)
        setList(deleteItem)
    }
    const handleCheckBox = (id) => {
        const update = list.map((item) => (
            item.id === id ? { ...item, checked: !item.checked } : item
        ))
        setList(update)
    }

    return (
        <Fragment>
            <form>
                <input type="text" placeholder="To do" ref={inputRef} onChange={handleInputTask} />
                <button type="button" onClick={handleSend} className="btnAdd"><BiTask /></button>
            </form>
            <ListContext.Provider value={{ list, handleDelete, handleCheckBox }}>
                <List />
            </ListContext.Provider>
        </Fragment>
    )
}
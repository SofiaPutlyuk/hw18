import { useContext } from "react"
import { ListContext } from "./ListContext"
import { MdDeleteOutline } from "react-icons/md";
import './list.css'
export const List = () => {
    const { list, handleDelete, handleCheckBox } = useContext(ListContext)
    return (
        <ul>
            <p className="textTasks">Your tasks</p>
            {list.map((elem) => (
                <li key={elem.id}>
                    <input type="checkbox" checked={elem.checked} onChange={() => handleCheckBox(elem.id)} />
                    <span style={{ textDecoration: elem.checked ? "line-through" : "none" }}>
                        {elem.tasks}
                    </span>
                    <button onClick={() => handleDelete(elem.id)} className="btnDelete"><MdDeleteOutline /></button>
                </li>
            ))}
        </ul>
    )
}
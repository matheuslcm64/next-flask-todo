import { useState } from "react";
import classes from "./TaskForm.module.css";
export default function TaskForm({setTodoList}){


    const [formData, setFormData] = useState({task:""})
    const changeHandler = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData)=>(
                {   
                    ...prevFormData, 
                    [name]:value
                }
            )
        );
    }

    const submitHandler = async (event)=>{
        event.preventDefault()
        // console.log(formData)
        try{
            const response = await fetch("http://127.0.0.1:5000/save", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {"Content-Type": "application/json"}
            })
            const new_data = await response.json()
            // console.log(new_data)

            setTodoList((prevTodoList)=>[...prevTodoList, new_data])

            setFormData((prevFormData) => Object.keys(prevFormData).reduce((acc, key)=>
            { acc[key] = "" 
                return acc
            },{}));
            
        }catch(err){
            console.error("Error: ", err);
        }
    }

    return (
            <form className={classes.form} onSubmit={submitHandler}>
            
                <label htmlFor="task">Task</label>
                <input type="text" id="task" name="task" value={formData.task} onChange={changeHandler} required></input>
            
                <button>Add Task</button>
            </form>
    );
}
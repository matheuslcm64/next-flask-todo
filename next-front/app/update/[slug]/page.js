"use client"
import Modal from "@/components/Modal";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import * as React from "react";


export default function UpdateTask({params}) {
    const {slug} = React.use(params);
    const searchParams = useSearchParams();
    const taskContent = searchParams.get("task");
    const [formData, setFormData] = useState({task: taskContent});
    function changeHandler(event) {
        const {name, value} = event.target;
        setFormData(
            (prevFormData)=>(
                {
                    ...prevFormData,
                    [name]: value
                }
            )
        );
    }

    function submitHandler(event) {
        event.preventDefault();
        const updateData = async () => {
            await fetch("http://127.0.0.1:5000/"+slug, 
                {
                    method: "PATCH",
                    body: JSON.stringify(formData),
                    headers: {"Content-Type": "application/json"}
                }
            )
            redirect("/")    
        }
        
        updateData();
    }
    return (
        <Modal>
            <form onSubmit={submitHandler}>

                <label htmlFor="update">Update post {slug}</label>
                <input type="text" id="update" name="task" value={formData.task} onChange={changeHandler}></input>
                <button type="submit">Edit</button>
            </form>
        </Modal>
    ); 
}
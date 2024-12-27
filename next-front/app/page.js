'use client'

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Task from "@/components/Task";
import TaskForm from "@/components/TaskForm";

export default function Home() {
  const [todoList, setTodoList] = useState([])
  useEffect(()=>{ 
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:5000/tasks", {
        method: "GET",
        headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}
      });
      const data = await response.json()
      console.log(data);

      if (data["todo_list"].length != 0) {
        setTodoList(data["todo_list"]);
      }
    }
    fetchData();

  },[]);


  // const [formData, setFormData] = useState({task:""})
  // const changeHandler = (event) => {
  //   const {name, value} = event.target;
  //   setFormData((prevFormData)=>(
  //     {...prevFormData, 
  //       [name]:value
  //     }
  //   ))

  // }

  // const submitHandler = async (event)=>{
  //   event.preventDefault()
  //   console.log(formData)
  //   try{
  //     const response = await fetch("http://127.0.0.1:5000/save", {
  //       method: "POST",
  //       body: JSON.stringify(formData),
  //       headers: {"Content-Type": "application/json"}
  //     })
  //     const new_data = await response.json()
  //     console.log(new_data)
  //     setTodoList((prevTodoList)=>[...prevTodoList, new_data])

  //     setFormData((prevFormData) => Object.keys(prevFormData).reduce((acc, key)=>
  //       { acc[key] = "" 
  //         return acc
  //       },{}));
      
  //   }catch(err){
  //     console.error("Error: ", err);
  //   }
  // }

  return (
    <div className={styles.page}>
      {/* <form className={styles.form} onSubmit={submitHandler}>
        
          <label htmlFor="task">Task</label>
          <input type="text" id="task" name="task" value={formData.task} onChange={changeHandler} required></input>
        
        <button>Add Task</button>
      </form> */}
      <TaskForm setTodoList={setTodoList}/>
      {todoList.length == 0 ?  <p>No tasks.</p> : <ul className={styles.taskList}>
        {todoList.map((elem,idx)=>{
          return <Task key={idx} uuid={Object.keys(elem)[0]} task={Object.values(elem)[0]}></Task>
        })}
      </ul>} 

    </div>
  );
}

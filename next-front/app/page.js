'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
export default function Home() {
  const [formData, setFormData] = useState({task:""})
  const changeHandler = (event) => {
    const {name, value} = event.target;
    setFormData((prevFormData)=>(
      {...prevFormData, 
        [name]:value
      }
    ))

  }

  const submitHandler = async (event)=>{
    event.preventDefault()
    try{
      const response = await fetch("http://127.0.0.1:5000/save", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {"Content-Type": "application/json"}
      })
    
      const res = await response.json()
      console.log(res)
      
    }catch(err){
      console.error("Error: ", err);
    }
  }
  //foo()

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={submitHandler}>
        
          <label htmlFor="task">Task</label>
          <input type="text" id="task" name="task" value={formData.task} onChange={changeHandler} required></input>
        
        <button>Add Task</button>
      </form>
    </div>
  );
}

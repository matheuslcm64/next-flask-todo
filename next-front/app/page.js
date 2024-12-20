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

  const clear_clone =  (obj) => {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = "";
    }
    return copy;
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
      // for (let key in formData){
      //   console.log(key, formData[key]);
        
      // }
      // const clearForm = clear_clone(formData)
      
      setFormData((prevFormData) => Object.keys(prevFormData).reduce((acc, key)=>
        { acc[key] = "" 
          return acc
        },{}))
      
    }catch(err){
      console.error("Error: ", err);
    }
  }

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

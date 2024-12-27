'use client'
import classes from "./page.module.css";
import Modal from "@/components/Modal";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import * as React from 'react';

export default function DeleteTask({params}) {
    const searchParams = useSearchParams();
    const task = searchParams.get("task");
    const {slug} = React.use(params); 
    function deleteHandler() {
        const deleteData = async () => {
            const response = await fetch("http://127.0.0.1:5000/delete/"+slug);
            const data = await response.json();
            console.log(data);
        }
        deleteData();

    }
    return <>
        {/* <div className={classes.prior}></div> */}
        <Modal>
            <div className={classes.container}>
                <h2>Delete post {slug}</h2>
                <p>{task}</p>
                <div className={classes.buttons}>
                    <button onClick={deleteHandler}>Yes</button>
                    <Link href="/">No</Link>
                </div>
            </div>
        </Modal>
    </>
}
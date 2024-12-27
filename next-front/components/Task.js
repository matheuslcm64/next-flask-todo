import Link from "next/link";
import classes from "./Task.module.css";

export default function Task(props) {
    
    return (
        <li className={classes.task}>
            <div> 
                {props.task}
            </div>

            <Link href={`/delete/${props.uuid}?task=${encodeURIComponent(props.task)}`}>
                Delete
            </Link>


            {/* <Link href={"/update"}>

            </Link> */}
        </li>
    );
}
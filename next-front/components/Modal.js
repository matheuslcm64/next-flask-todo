import classes from "./Modal.module.css"
import { redirect } from "next/dist/server/api-utils";
export default function Modal(props) {
    
    // function closeHandler() {
    //     redirect("/");
    // }
    return (
        <>
            <div className={classes.backdrop}></div>
            <dialog open className={classes.modal}>
                {props.children}
            </dialog>
        </>
    );
}
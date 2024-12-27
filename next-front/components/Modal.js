import classes from "./Modal.module.css"
import { redirect } from "next/navigation";
export default function Modal(props) {
    
    function closeHandler() {
        redirect("/");
    }
    return (
        <>
            <div className={classes.backdrop} onClick={closeHandler}></div>
            <dialog open className={classes.modal}>
                {props.children}
            </dialog>
        </>
    );
}
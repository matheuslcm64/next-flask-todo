import Home from "@/app/page";

export default function DeleteLayout({children}) {

    return(
        <>
            {children}
            <Home/>
        </>
    );
}
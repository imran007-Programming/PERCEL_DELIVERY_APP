import App from "@/App";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contuct";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router";

const router=createBrowserRouter([
    {
        Component:App,
        path:"/",
        children:[
            {
                Component:HomePage,
                index:true
            },
            {
                Component:About,
                path:"/about"
            },
            {
                Component:Contact,
                path:"/contact"
            },
        ]
    }
])

export default router
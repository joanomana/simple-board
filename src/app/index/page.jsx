'use client';
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Home from "@/components/Home"
import Header from "@/components/Header"
import Student from "@/components/Student"

export default function Index() {
    const [selectedPage, setSelectedPage] = useState("home");

    // Estado para abrir/cerrar el sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

    // Función para alternar el estado del sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    return (
        <div className="flex">
            <Sidebar setSelectedPage={setSelectedPage} selectedPage={selectedPage} isSidebarOpen={isSidebarOpen} />
            <div className="flex flex-col  sm:w-5/8 md:w-full xl:w-full">
                <Header toggleSidebar={toggleSidebar}/>
                <div className="flex h-full">
                    {selectedPage === "home" && <Home/>}
                    {selectedPage === "course" && <h1>📚 Course Page</h1>}
                    {selectedPage === "students" && <Student/>}
                    {selectedPage === "payment" && <h1>💳 Payment Page</h1>}
                    {selectedPage === "report" && <h1>📊 Report Page</h1>}
                    {selectedPage === "settings" && <h1>⚙️ Settings Page</h1>}
                </div>
            </div>
        </div>
    );
}
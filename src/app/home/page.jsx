'use client';
import { useState,useEffect } from "react";
import {useRouter} from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Home1 from "@/components/Home"
import Header from "@/components/Header"
import Student from "@/components/Student"
import Payment from "@/components/Payment"

export default function Index() {
    const [selectedPage, setSelectedPage] = useState("home");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/"); // Redirige al login si no hay token
        } else {
            setIsLoading(false); // Ya tiene sesión activa
        }
    }, []);
    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    if (isLoading) return <p>Cargando...</p>; // Evita parpadeo


    return (
        <div className="flex">
            <Sidebar setSelectedPage={setSelectedPage} selectedPage={selectedPage} isSidebarOpen={isSidebarOpen} />
            <div className="flex flex-col  sm:w-5/8 md:w-full xl:w-full">
                <Header toggleSidebar={toggleSidebar}/>
                <div className="flex h-full">
                    {selectedPage === "home" && <Home1/>}
                    {selectedPage === "course" && <h1>📚 Course Page</h1>}
                    {selectedPage === "students" && <Student/>}
                    {selectedPage === "payment" && <Payment/>}
                    {selectedPage === "report" && <h1>📊 Report Page</h1>}
                    {selectedPage === "settings" && <h1>⚙️ Settings Page</h1>}
                </div>
            </div>
        </div>
    );
}


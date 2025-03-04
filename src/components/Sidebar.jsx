"use client";
import React from "react";
import Link from "next/link";
import { TiHomeOutline } from "react-icons/ti";
import { FaRegBookmark } from "react-icons/fa";
// sm:w-6/8 md:w-full xl:w-full
export default function Sidebar({ setSelectedPage, selectedPage, isSidebarOpen }) {
    return (
        <div className={` bg-[#F2EAE1] p-2 left-0 transition-all duration-300 h-dvh overflow-y-scroll ${isSidebarOpen ? 'w-80' : 'w-30'} custom-scrollbar `}>
            {isSidebarOpen ? (
                <div className="flex flex-col items-center mt-1 ">
                    <div className="flex items-center">
                        <img src="/Line.svg" alt="Line" className="w-2 h-10" />
                        <h1 className="text-[18px] [var(--font-montserrat)] font-bold">CRUD OPERATIONS</h1>
                    </div>                    
                    <div className="mt-20 flex flex-col items-center">
                        <img src="/img/photo.svg" alt="profile foto" className="rounded-full" />
                        <h1 className="[var(--font-montserrat)] font-bold">Karthi Madesh</h1>
                        <p className="text-[#FEAF00]">Admin</p>
                    </div>
                    <div className="flex flex-col mt-10 gap-5">
                        <button className={`${selectedPage === "home" ? "bg-orange-400 shadow-md rounded-md" : ""} flex gap-5 w-full p-3`} onClick={() => setSelectedPage("home")}>
                            <TiHomeOutline className="text-2xl w-5 h-5" />
                            <h1>Home</h1>
                        </button>
                        <button className={`${selectedPage === "course" ? "bg-orange-400 shadow-md rounded-md" : ""} flex gap-5 w-full p-3`} onClick={() => setSelectedPage("course")}>
                            <FaRegBookmark className="text-2xl w-5 h-5" />
                            <h1>Course</h1>
                        </button>
                        <button className={`${selectedPage === "students" ? "bg-orange-400 shadow-md rounded-md" : ""} flex gap-5 w-full p-3`} onClick={() => setSelectedPage("students")}>
                            <img src="/img/graduation.svg" alt="graduation" className="w-5 h-5" />
                            <h1>Students</h1>
                        </button>
                        <button className={`${selectedPage === "payment" ? "bg-orange-400 shadow-md rounded-md" : ""} flex gap-5 w-full p-3`} onClick={() => setSelectedPage("payment")}>
                            <img src="/img/pay.svg" alt="pay" className="w-5 h-5" />
                            <h1>Payment</h1>
                        </button>
                        <button className={`${selectedPage === "report" ? "bg-orange-400 shadow-md rounded-md" : ""} flex gap-5 w-full p-3`} onClick={() => setSelectedPage("report")}>
                            <img src="/img/report.svg" alt="report" className="w-5 h-5" />
                            <h1>Report</h1>
                        </button>
                        <button className={`${selectedPage === "settings" ? "bg-orange-400 shadow-md rounded-md" : ""} flex gap-5 w-full p-3`} onClick={() => setSelectedPage("settings")}>
                            <img src="/img/settings.svg" alt="settings" className="w-5 h-5" />
                            <h1>Settings</h1>
                        </button>
                    </div>
                    <Link 
                    onClick={() => setSelectedPage("logout")}
                    href="/" 
                    className="flex mt-30 justify-center items-center gap-5 mb-5">
                        <p className="rounded-lg">Log Out</p>
                        <img src="/img/logout.svg" alt="logout" />
                    </Link>
                </div>
            ):(
                <div className="flex flex-col items-center mt-2 w-20 justify-between ">
                    <div className="mt-3 flex items-center justify-center">
                        <img src="/Line.svg" alt="Line" className=" w-8 h-15" />
                        <img src="/img/photo.svg" alt="profile foto" className="rounded-full w-20" />
                    </div>
                    <div className="flex flex-col justify-center items-center mt-10 gap-5">
                        <button className={`${selectedPage === "home" ? "bg-orange-400 shadow-md rounded-md " : ""} flex gap-5 items-center justify-center px-5 py-3`} onClick={() => setSelectedPage("home")}>
                            <TiHomeOutline className="w-5 h-5" />
                        </button>
                        <button className={`${selectedPage === "course" ? "bg-orange-400 shadow-md rounded-md" : ""} flex gap-5 items-center justify-center px-5 py-3`} onClick={() => setSelectedPage("course")}>
                            <FaRegBookmark className="w-5 h-5" />
                        </button>
                        <button className={`${selectedPage === "students" ? "bg-orange-400 shadow-md rounded-md" : ""} flex gap-5 items-center justify-center px-5 py-3`} onClick={() => setSelectedPage("students")}>
                            <img src="/img/graduation.svg" alt="graduation" className="w-6 h-8" />
                        </button>
                        <button className={`${selectedPage === "payment" ? "bg-orange-400 shadow-md rounded-md" : ""} flex gap-5 items-center justify-center px-5 py-3`} onClick={() => setSelectedPage("payment")}>
                            <img src="/img/pay.svg" alt="pay" className="w-5 h-5" />
                        </button>
                        <button className={`${selectedPage === "report" ? "bg-orange-400 shadow-md rounded-md" : ""} flex gap-5 items-center justify-center px-5 py-3`} onClick={() => setSelectedPage("report")}>
                            <img src="/img/report.svg" alt="report" className="w-5 h-5" />
                        </button>
                        <button className={`${selectedPage === "settings" ? "bg-orange-400 shadow-md rounded-md" : ""} flex gap-5 items-center justify-center px-5 py-3`} onClick={() => setSelectedPage("settings")}>
                            <img src="/img/settings.svg" alt="settings" className="w-5 h-5" />
                        </button>
                    </div>
                    <Link 
                    onClick={() => setSelectedPage("logout")}
                    href="/" 
                    className="flex justify-center items-center mt-5">
                        <img src="/img/logout.svg" alt="logout" />
                    </Link>
                </div>
            )}
        </div>
    );
}
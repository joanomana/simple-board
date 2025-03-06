"use client";
import { useEffect, useState } from "react";

const API_URL1 = 'https://67c8e6cb0acf98d07088030b.mockapi.io/api/v1/students/students';


export default function Home (){
    const [students,setStudents] = useState([]);

    const fetchStudent = async () => {
        const response = await fetch(API_URL1);
        const data = await response.json();
        setStudents(data);
    };
    
    useEffect(() => {
        fetchStudent();
    }
    ,[]);


    return(
        <div className="grid grid-cols-4 justify-center w-full gap-5 2xl:gap-30 py-3 px-5   ">
            <div className="flex  justify-between w-full h-45 bg-[#F0F9FF] p-3 rounded-lg shadow-md">
                <div className="flex flex-col justify-start items-start gap-2">
                    <img src="/img/graduation-blue.svg" alt="graduation" className="h-10 "/>
                    <h1 className="text-[#6C6C6C]">Students</h1>
                </div>
                <div className="pt-30">
                    <h1 className="text-2xl font-bold">{students.length}</h1>
                </div>
            </div>
            <div className="flex justify-between w-full h-45 bg-[#FEF6FB] p-3 rounded-lg shadow-md">
                <div className="flex flex-col justify-start items-start gap-2">
                    <img src="/img/bookmark.svg" alt="graduation" className="h-10"/>
                    <h1 className="text-[#6C6C6C]">Course</h1>
                </div>
                <div className="pt-30">
                    <h1 className="text-2xl font-bold">13</h1>
                </div>
            </div>
            <div className="flex flex-col  w-full h-45 bg-[#FEFBEC] p-3 rounded-lg shadow-md">
                <div className="flex flex-col justify-start items-start gap-2">
                    <img src="/img/payment.svg" alt="graduation" className="h-10"/>
                    <h1 className="text-[#6C6C6C]">Payments</h1>
                </div>
                <div className=" flex gap-2 font-bold justify-end items-end pt-13">
                    <p>INR</p>
                    <h1 className="text-2xl">556,000</h1>
                </div>

            </div>
            <div className="flex w-full justify-between h-45 bg-linear-to-r from-[#FEAF00] to-[#F8D442] p-3 rounded-lg shadow-md">
                <div className="flex flex-col justify-start items-start gap-2">
                    <img src="/img/person.svg" alt="graduation" className="h-10"/>
                    <h1 className="text-white">Users</h1>
                </div>
                <div className="pt-30">
                    <h1 className="text-2xl font-bold">3</h1>
                </div>
            </div>
            
        </div>
    )
}
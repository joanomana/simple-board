'use client';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import {useRef} from 'react';




export default function Header({toggleSidebar}){
    const inputRef = useRef(null);

    // Función para enfocar el input cuando se hace clic en el ícono de búsqueda
    const handleSearchClick = () => {
        inputRef.current.focus();
    };
    return(
        <div className="flex justify-between shadow-2xs px-5 py-3 items-center">
            <IoArrowBackCircleOutline className="text-4xl text-gray-400 hover:cursor-pointer"
            onClick={toggleSidebar} />
            <div className="flex gap-10 items-center">
                <form action="#" className="rounded-lg border-gray-200 border-1 px-3 py-2 flex" >
                    <input type="text"
                    ref={inputRef}
                    name="search"
                    placeholder="Search..."
                    className="px-2 focus:outline-none"/>
                    <IoIosSearch className="text-2xl text-gray-400 hover:cursor-pointer"
                    onClick={handleSearchClick} />

                </form>
                <IoIosNotificationsOutline className="text-4xl text-gray-400 hover:cursor-pointer"/>
            </div>

        </div>
    )
}
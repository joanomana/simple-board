'use client'
import Swal from "sweetalert2";
import { FaCaretDown } from "react-icons/fa6";
import { FiTrash } from "react-icons/fi";
import { LuPencil } from "react-icons/lu";
import { useEffect, useState } from "react";

const API_URL = 'https://67c8e6cb0acf98d07088030b.mockapi.io/api/v1/students/students';

export default function Student() {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({ name: "", email: "", phone: "", enroll: "", date: "" });
    const [edit, setEdit] = useState(null);
    const [showFormAdd, setShowFormAdd] = useState(false);
    const [showFormEdit, setShowFormEdit] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage  , setStudentsPerPage] = useState(5);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s]+$/;

    useEffect(() => {
        fetchStudent();
        const calculateStudentsPerPage = () => {
            const tableHeight = window.innerHeight * 0.6; // 60% de la altura de la pantalla
            const rowHeight = 50; // Aproximado, ajusta si es necesario
            const calculatedPerPage = Math.floor(tableHeight / rowHeight);
            setStudentsPerPage(calculatedPerPage);
        };
    
        calculateStudentsPerPage();
        window.addEventListener("resize", calculateStudentsPerPage);
        return () => window.removeEventListener("resize", calculateStudentsPerPage);
    }, []);

    const fetchStudent = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setStudents(data);
    };

    const addStudent = async () => { //agrega estudiante y valida email y nombre
        if (!emailRegex.test(newStudent.email)) {
            alert("Please, enter a valid email.");
            return;
        }

        
        if (!nameRegex.test(newStudent.name)) {
            alert("Name cannot contain numbers or special characters.");
            return;
        }

        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStudent),
        });
        setNewStudent({ name: "", email: "", phone: "", enroll: "", date: "" });
        setShowFormAdd(false);
        fetchStudent();
        Swal.fire({
            title: "Added!",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
        });
    };

    const editStudent = async () => { //edita estudiante y valida email y nombre
        if (!edit) return;
        if (!emailRegex.test(edit.email)) {
            alert("Please, enter a valid email.");
            return;
        }

        // Validar el nombre
        if (!nameRegex.test(edit.name)) {
            alert("Name cannot contain numbers or special characters.");
            return;
        }
        await fetch(`${API_URL}/${edit.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(edit),
        });
        setEdit(null);
        setShowFormEdit(false);
        fetchStudent();
        Swal.fire({
            title: "Updated!",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
        });
    };

    const deleteStudent = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        });
        
        
    };
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.ceil(students.length / studentsPerPage);


    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };


    return (
        <div className=" bg-[#F8F8F8] w-full relative">
            <div className="flex flex-col my-5">
                <div className="flex justify-between items-center px-2">
                    <h1 className="font-bold text-3xl">Students List</h1>
                    <div className="flex gap-5">
                        <span className="" > Page {currentPage} of {totalPages}</span>
                        <div className="flex flex-col text-orange-400 text-1xl">
                            <FaCaretDown className="rotate-180 hover:cursor-pointer" onClick={prevPage} disabled={currentPage===1} />
                            <FaCaretDown className="hover:cursor-pointer" onClick={nextPage} disabled={currentPage=== totalPages} />
                        </div>
                        <button
                            className="bg-[#FEAF00] text-white px-4 py-2 rounded hover:cursor-pointer"
                            onClick={() => setShowFormAdd(true)}
                        >
                            ADD NEW STUDENT
                        </button>
                    </div>
                </div>
                <div className="h-px bg-gray-400 my-2"></div>

                <table className="w-full text-left border-separate border-spacing-y-2">
                    <thead>
                        <tr className="text-gray-500">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Phone</th>
                            <th className="px-4 py-2">Enroll Number</th>
                            <th className="px-4 py-2">Date of admission</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStudents.map((std) => (
                            <tr key={std.id} className="bg-white rounded-md transition-all border-spacing-y-8">
                                <td className="px-4 py-2">{std.name}</td>
                                <td className="px-4 py-2">{std.email}</td>
                                <td className="px-4 py-2">{std.phone}</td>
                                <td className="px-4 py-2">{std.enroll}</td>
                                <td className="px-4 py-2">{std.date}</td>
                                <td className="px-4 py-2">
                                    <div className="flex gap-5">
                                        <button
                                            className="text-orange-400 hover:cursor-pointer"
                                            onClick={() => {
                                                setEdit(std);
                                                setShowFormEdit(true);
                                            }}
                                        >
                                            <LuPencil className="text-2xl" />
                                        </button>
                                        <button
                                            className="text-orange-400 hover:cursor-pointer"
                                            onClick={() => deleteStudent(std.id)}
                                        >
                                            <FiTrash className="text-2xl" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showFormAdd && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                        <h2 className="text-xl mb-4">Add Student</h2>
                        <div>
                            <h1>Name</h1>
                            <input className="border p-2 m-1 w-full" type="text" placeholder="Name" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
                        </div>
                        <div>
                            <h1>Email</h1>
                            <input className="border p-2 m-1 w-full" type="email" placeholder="Email" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} />
                        </div>
                        <div>
                            <h1>Phone</h1>
                            <input className="border p-2 m-1 w-full" type="text" placeholder="Phone" value={newStudent.phone} onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })} />
                        </div>
                        <div>
                            <h1>Enroll Number</h1>
                            <input className="border p-2 m-1 w-full" type="text" placeholder="Enroll Number" value={newStudent.enroll} onChange={(e) => setNewStudent({ ...newStudent, enroll: e.target.value })} />
                        </div>
                        <div>
                            <h1>Date of Admission</h1>
                            <input className="border p-2 m-1 w-full" type="date" value={newStudent.date} onChange={(e) => setNewStudent({ ...newStudent, date: e.target.value })} />
                        </div>
                        <div className="mt-2 flex justify-end gap-2">
                            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addStudent}>Save</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => setShowFormAdd(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {showFormEdit && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-sm  bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                        <h2 className="text-xl mb-4">Edit Student</h2>
                        <div>
                            <h1>Name</h1>
                            <input className="border p-2 m-1 w-full"  type="text" value={edit?.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} />
                            <h1>Email</h1>
                            <input className="border p-2 m-1 w-full" type="text" value={edit?.email} onChange={(e) => setEdit({ ...edit, email: e.target.value })} />
                            <h1>Phone</h1>
                            <input className="border p-2 m-1 w-full" type="number" value={edit?.phone} onChange={(e) => setEdit({ ...edit, phone: e.target.value })} />
                            <h1>Enroll Number</h1>
                            <input className="border p-2 m-1 w-full" type="text" value={edit?.enroll} onChange={(e) => setEdit({ ...edit, enroll: e.target.value })} />
                            <h1>Date of Admission</h1>
                            <input className="border p-2 m-1 w-full" type="date" value={edit?.date} onChange={(e) => setEdit({ ...edit, date: e.target.value })} />
                        </div>
                        <div className="mt-2 flex justify-end gap-2">
                            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={editStudent}>Save</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => setShowFormEdit(false)}>Cancelr</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

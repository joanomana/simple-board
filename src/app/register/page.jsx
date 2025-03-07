'use client';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            Swal.fire("Error", "Please, enter a valid email.", "error");
            return;
        }

        try {
            const res = await fetch("/api/addUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to register user");
            }

            Swal.fire({
                title: "Successful!",
                text: "Returning to login",
                icon: "success",
                timer: 5000,
                showConfirmButton: false,
            });

            setTimeout(() => {
                router.push("/");
            }, 2000);

        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    return (
        <div className="bg-gradient-to-r from-orange-400 to-yellow-400 h-screen flex justify-center items-center">
            <div className="bg-white shadow-2xl rounded-lg px-7 py-7 xl:w-1/3 md:w-100 2xl:w-2/6 md:h-130 sm:w-1/2 flex flex-col gap-5 justify-center">
                <div>
                    <div className="flex justify-center items-center gap-2">
                        <img src="/Line.svg" alt="Line" className="" />
                        <h1 className="text-3xl font-bold xl:text-4xl">CRUD OPERATIONS</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2 mt-5 xl:text-1xl">
                        <h1 className="font-semibold xl:text-2xl">REGISTER</h1>
                        <p className="text-[#6C6C6C] font-regular">Enter your information to create your account</p>
                    </div>
                </div>
                <form className="flex flex-col gap-4 px-2">
                    <div className="flex flex-col gap-2 font-medium">
                        <div className="flex flex-col gap-1">
                            <h1>Username</h1>
                            <input
                                type="text"
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                                className="border-gray-300 border p-2 w-full rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1>Email</h1>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="border-gray-300 border p-2 w-full rounded-lg" 
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1>Password</h1>
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-gray-300 border p-2 w-full rounded-lg"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleRegister}
                        className="w-full p-2 bg-[#FEAF00] text-white rounded-lg hover:cursor-pointer"
                    >
                        Register
                    </button>
                </form>
                <div className="flex justify-center items-center">
                    <button onClick={() => router.push("/")} className="w-4/6 p-2 bg-[#FEAF00] text-white rounded-lg hover:cursor-pointer " >Back to login</button>
                </div>
            </div>
        </div>
    );
}

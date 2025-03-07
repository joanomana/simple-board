'use client';
import { useEffect, useState } from 'react';
import { FaCaretDown } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";



const API_URL = 'https://67c8e6cb0acf98d07088030b.mockapi.io/api/v1/students/payment';

export default function Payment(){
    const [payment,setPayment] = useState([]);
    const [viewpay, setViewPay] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);


    const fecthpayment = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPayment(data);
        setViewPay(false);
    }

    useEffect(() => {
        fecthpayment();
    }
    ,[]);
    return (
        <div className=" bg-[#F8F8F8] w-full relative px-3 py-5">
            <div className='flex justify-between pb-2 px-5'>
                <h1 className='text-2xl font-bold'>Payment Details</h1>
                <div className='flex flex-col text-orange-500'>
                <FaCaretDown className='rotate-180'/>
                <FaCaretDown/>
                </div>
            </div>
            <div className="h-px bg-gray-400 my-2"></div>
            <table className='w-full text-center border-separate border-spacing-y-2'>
                <thead>
                    <tr className='text-gray-500'>
                        <th className='px-4 py-2'>Name</th>
                        <th className='px-4 py-2'>Payment Schedule</th>
                        <th className='px-4 py-2'>Bill Number</th>
                        <th className='px-4 py-2'> Amount Paid</th>
                        <th className='px-4 py-2'> Balance amount</th>
                        <th className='px-4 py-2'>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {payment.map((payment) => (
                        <tr key={payment.id} 
                        className={` ${payment.id % 2 === 0 ? 'bg-[#F8F8F8]' : 'bg-white'}`}>
                            <td className='px-4 py-2'>{payment.name}</td>
                            <td className='px-4 py-2'>{payment.payment}</td>
                            <td className='px-4 py-2'>{payment.bill}</td>
                            <td className='flex items-center gap-1'>
                                <h1>INR</h1>
                                <p className=' py-2'>{payment.amount}</p>
                            </td>
                            <td className='px-4 py-2 '>{payment.balance}</td>
                            <td className='px-4 py-2'>{payment.date}</td>
                            <td>
                                <div className='flex pt-2 text-2xl text-orange-500 hover:cursor-pointer'
                                onClick={() =>{
                                    setSelectedPayment(payment);
                                    setViewPay(true);
                                }}>
                                    <FaRegEye />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {viewpay && selectedPayment && (
                <div className='fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-opacity-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4'>
                        <h1 className='text-2xl text-orange-500'>Payment Details</h1>
                        <div className='grid grid-cols-3 justify-between items-center gap-10 text-center'>
                            <div className='flex flex-col rounded-lg shadow-md p-1'>
                                <h1 className='font-bold'>Name:</h1>
                                <p>{selectedPayment.name}</p>
                            </div>
                            <div className='flex flex-col rounded-lg shadow-md p-1'>
                                <h1 className='font-bold'>Payment Schedule:</h1>
                                <p>{selectedPayment.payment}</p>
                            </div>
                            <div className='flex flex-col rounded-lg shadow-md p-1'>
                                <h1 className='font-bold'>Bill Number:	</h1>
                                <p>{selectedPayment.bill}</p>
                            </div>
                            <div className='flex flex-col rounded-lg shadow-md p-1'>
                                <h1 className='font-bold'>Amount Paid:	</h1>
                                <p>{selectedPayment.amount}</p>
                            </div>
                            <div className='flex flex-col rounded-lg shadow-md p-1'>
                                <h1 className='font-bold'>Balance amount:	</h1>
                                <p>{selectedPayment.balance}</p>
                            </div>
                            <div className='flex flex-col rounded-lg shadow-md p-1'>
                                <h1 className='font-bold'>Date:</h1>
                                <p>{selectedPayment.date}</p>
                            </div>
                        </div>
                        <button
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:cursor-pointer"
                        onClick={() => setViewPay(false)}
                        >
                        Close
                        </button>
                        

                    </div>
                
                </div>
                
                
            )}
        </div>
    )
}
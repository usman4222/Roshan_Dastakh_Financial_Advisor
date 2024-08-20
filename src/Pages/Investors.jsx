import React, { useEffect, useState } from "react";
import memoji from "../assets/images/memoji.png";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import { advisorDetails, advisorUsers } from "../Services/GlobalApi";

const Investors = () => {
    const location = useLocation();
    const [userData] = useOutletContext();
    const [alladvisorUsers, setadvisorUsers] = useState('');
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        if (userData && userData.id) {
            getadvisorUsers();
        }
    }, [userData]);

    const getadvisorUsers = async () => {
        const formData = new FormData();
        formData.append('advisor_id', userData.id);
        try {
            console.log(userData.id);
            const response = await fetch(advisorUsers, {
                method: 'POST',
                body: formData
            });
            const responseData = await response.json();
            setadvisorUsers(responseData.data);
            console.log(responseData);
        } catch (error) {
            console.log(error);
        }
    }
    // Event handler for updating the search term
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    return <div>
        <div className="container mx-auto p-3">
            <div className=" sticky">

                <h2 className="md:text-left text-center text-[20px]"><strong>Investor Lists</strong></h2>
                <p className="md:text-left text-center text-[14px] text-gray-600">Explore the list of investors and their details. Identify top performers and track profit trends.</p>

                <form className="max-w-md mx-auto mt-4">
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by Name" required value={searchTerm}
                            onChange={handleSearchChange} />
                    </div>
                </form>
            </div>

            <div className="mt-4">
                {alladvisorUsers && alladvisorUsers.filter(item => item.name.toLowerCase().includes(searchTerm))
                    .map((item, index) => (
                        <Link key={index} to={'/profile'} state={{id: item.id}}>
                            <div  className="flex gap-4 bg-white p-3 rounded-lg shadow-md justify-between mb-4">
                                <div className="w-20 h-20 border p-1 rounded-full my-auto">
                                    <img src={item.photo} className="w-full h-full rounded-full object-cover" alt="" />
                                </div>
                                <div className="me-auto w-full">
                                    <p><strong>{item.name}</strong></p>
                                    <p className="text-gray-600 text-[14px]">{item.lc_id}</p>
                                    <div className="flex justify-between">
                                        <p className="mb-0 text-gray-600 text-[14px]">Rs. {item.investment.active_investment}</p>
                                        <p className="mb-0 text-gray-600 text-[14px]">(Active)</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="mb-0 text-gray-600 text-[14px]">Rs. {item.investment.in_active_investment}</p>
                                        <p className="mb-0 text-gray-600 text-[14px]">(In-Active)</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="mb-0 text-gray-600 text-[14px]">Rs. {item.investment.profit}</p>
                                        <p className="mb-0 text-gray-600 text-[14px]">(Profit)</p>
                                    </div>
                                </div>
                                <div className="my-auto">
                                    <IoIosArrowForward />
                                </div>
                            </div>
                        </Link>

                    ))}

            </div>

        </div>
    </div>;
};

export default Investors;

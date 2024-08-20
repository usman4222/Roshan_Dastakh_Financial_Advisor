import React, { useEffect, useState } from "react";
import { IoLocationSharp, IoLogOutOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { IoIosLock } from "react-icons/io";
import { advisorUsers, updateAdvisor, updateProfile, userDetails } from "../Services/GlobalApi";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Button, Dialog, DialogHeader, DialogBody, DialogFooter,
} from "@material-tailwind/react";
import toast, { Toaster } from 'react-hot-toast';


const AdvisorDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state.id;
    const [userData, setUserData] = useState(''); // Use userData for storing user data
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [openPin, setOpenPin] = React.useState(false);
    const [openFather, setOpenFather] = React.useState(false);
    const [phone, setPhone] = useState('');
    const [fatherName, setfatherName] = useState('');
    const [address, sethandleAddress] = useState('');
    const [pin, setPin] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleOpen = () => setOpen(!open);
    const handleOpenPin = () => setOpenPin(!openPin);
    const handleFather = () => setOpenFather(!openFather);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data')) || {};
        setUserData(data);
        setPhone(data.phone || '');
        setfatherName(data.father_name || '');
        sethandleAddress(data.address || '');
    }, []);

    const fetchUserData = async () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('advisor_id', userId);
        try {
            console.log(userId);
            const response = await fetch(advisorUsers, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const responseData = await response.json();
            setUserData(responseData.data);
            // setPhone(responseData.data.phone);
            // setfatherName(responseData.data.father_name);
            // sethandleAddress(responseData.data.address);
            // setPin(responseData.data.pin);
            console.log(responseData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const handlePhone = (e) => {
        setPhone(e.target.value);
    }
    const handleFatherName = (e) => {
        setfatherName(e.target.value);
    }
    const handleAddress = (e) => {
        sethandleAddress(e.target.value);
    }
    const handlePin = (e) => {
        setPin(e.target.value);
    }
    // handle phone
    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('phone', phone);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(updateProfile, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataToSend
            });
            const responseData = await response.json();
            setUserData(responseData.data);
            setPhone(responseData.data.phone);

            console.log
        } catch (error) {
            console.log(error);
        }
    }
    // handle father name
    const handleFatherSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('advisor_id', userData.id);
        formDataToSend.append('father_name', fatherName);
        formDataToSend.append('address', address);
        formDataToSend.append('phone', phone);

        try {
            const response = await fetch(updateAdvisor, {
                method: 'POST',
                body: formDataToSend
            });
            const responseData = await response.json();
            setUserData(responseData.data);
            localStorage.setItem('data', JSON.stringify(responseData.data));
            setfatherName(responseData.data.father_name);
            sethandleAddress(responseData.data.address);
            setPhone(responseData.data.phone);

            console.log(responseData);
        } catch (error) {
            console.log(error);
        }
    }
    // handle pin
    const handlePinSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('advisor_id', userData.id);
        formDataToSend.append('pin', pin);

        function authenticatePin(pin) {
            const pinRegex = /^\d{6}$/;
            if (!pinRegex.test(pin)) {
                setErrorMessage("PIN must be a 6-digit number.");

                return false;
            }
            // If the PIN is 6 digits, it's valid
            return true;
        }

        if (authenticatePin(pin)) {
            try {
                const response = await fetch(updateAdvisor, {
                    method: 'POST',
                    body: formDataToSend
                });

                if (!response.ok) {
                    throw new Error('Failed to submit form data');
                }
                setErrorMessage("");

                toast.success('Form Submit Successfully!')

                const responseData = await response.json();
                // console.log(responseData);
                setUserData(responseData.data);
                setPin(responseData.data.pin);

            } catch (error) {
                console.log(error);
            }
        } else {
            // console.error("Invalid PIN. Please enter a 6-digit number.");
            setErrorMessage("Invalid PIN. Please enter a 6-digit number.");

        }


    }
    const handleLogout = () => {
        // Clear authentication-related data from local storage
        localStorage.removeItem('data');
        localStorage.removeItem('isLoggIn');

        navigate('/');
        window.location.reload();
    };
    if (!userData) {
        return <><p>Loading Data...</p></>
    }
    return <div>

        {userData && (
            <div className="container mx-auto p-4">
                <div className="md:flex gap-4 md:text-left text-center">
                    <img src={userData.photo} className="w-16 h-16 md:mx-0 mx-auto rounded-full object-cover" alt="" />
                    <div className="">
                        <h2><strong>{userData.name}</strong></h2>
                        <p>{userData.cnic}</p>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-xl mt-4 p-4 md:w-1/2" onClick={handleFather}>
                    <span>S/D/O: <strong>{userData.father_name}</strong></span>
                    <div className="flex mt-2 gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <IoLocationSharp className=" text-blue-700" />
                        </div>
                        <p className="my-auto">{userData.address}</p>
                    </div>
                    <div className="flex mt-2 gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <FaPhone className=" text-blue-700" />
                        </div>
                        <p className="my-auto">{userData.phone}</p>
                    </div>
                </div>
                <Dialog open={openFather} handler={handleFather}>
                    <DialogHeader>Update Profile</DialogHeader>
                    <p className="px-4 -mt-4">Update Father Name and Location from here.</p>
                    <form onSubmit={handleFatherSubmit}>
                        <DialogBody>
                            <div className="">
                                <label className="block mb-2 text-sm font-medium text-cyan-700 dark:text-white">Father Name</label>
                                <input type="text" name="father_name" onChange={handleFatherName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Father Name" value={fatherName} required />
                            </div>
                            <div className="mt-3">
                                <label className="block mb-2 text-sm font-medium text-cyan-700 dark:text-white">Location</label>
                                <input type="text" name="address" onChange={handleAddress} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" value={address} required />
                            </div>
                            <div className="mt-3">
                                <label className="block mb-2 text-sm font-medium text-cyan-700 dark:text-white">Phone Number</label>
                                <input type="text" name="address" onChange={handlePhone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" value={phone} required />
                            </div>

                        </DialogBody>
                        <DialogFooter>
                            <Button variant="gradient" color="blue" type="submit" className="w-full" onClick={handleFather}>
                                <span>UPDATE</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </Dialog>
                <div className="bg-white shadow-lg rounded-xl mt-4 p-4 md:w-1/2 cursor-pointer" onClick={handleOpenPin}>
                    {errorMessage ? (
                        <h1 className="text-center font-bold leading-tight tracking-tight text-red-500  dark:text-white">
                            {errorMessage}
                        </h1>
                    ) : ''}
                    <div className="flex gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <IoIosLock className=" text-blue-700" />
                        </div>
                        <p className="my-auto"><strong>PIN</strong></p>
                    </div>
                </div>
                <Dialog open={openPin} handler={handleOpenPin}>
                    <DialogHeader>Enter New 6-Digit Pin !</DialogHeader>
                    <p className="px-4 -mt-4">Set 6-digit code of your account. So, you can update your password.</p>
                    <form onSubmit={handlePinSubmit}>
                        <DialogBody>
                            <div className="">
                                <input type="number" name="pin" onChange={handlePin} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter 6 Digit Pin" />
                            </div>

                        </DialogBody>
                        <DialogFooter>
                            <Button variant="gradient" color="blue" type="submit" className="w-full" onClick={handleOpenPin}>
                                <span>UPDATE</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </Dialog>

                <div className="bg-white shadow-lg rounded-xl mt-4 p-4 md:w-1/2 cursor-pointer" onClick={handleLogout}>
                    <div className="flex gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <IoLogOutOutline className=" text-blue-700" />
                        </div>
                        <p className="my-auto"><strong>Logout</strong></p>
                    </div>
                </div>
            </div>
        )}
    </div>;
};

export default AdvisorDetails;

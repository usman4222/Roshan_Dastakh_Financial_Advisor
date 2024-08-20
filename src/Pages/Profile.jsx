import React, { useEffect, useState } from "react";
import { IoLocationSharp, IoLogOutOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { updateProfile, userDetails } from "../Services/GlobalApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Button, Dialog, DialogHeader, DialogBody, DialogFooter,
} from "@material-tailwind/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import tax from "../assets/images/ic_tax.png";
import statment from "../assets/images/ic_statment.png";
import ic_investment from "../assets/images/ic_investment.png";
import ic_money from "../assets/images/ic_money.png";
import ic_withdraw from "../assets/images/ic_withdraw.png";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

const Profile = () => {
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

    const handleOpen = () => setOpen(!open);
    const handleOpenPin = () => setOpenPin(!openPin);
    const handleFather = () => setOpenFather(!openFather);

    useEffect(() => {
        fetchUserData();
        // console.log();
    }, []);

    const fetchUserData = async () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('user_id', userId);
        try {
            console.log(userId);
            const response = await fetch(userDetails, {
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
    const handleLogout = () => {
        // Clear authentication-related data from local storage
        localStorage.removeItem('token');
        localStorage.setItem('isLoggIn', 'false');

        navigate('/login');
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
        formDataToSend.append('father_name', fatherName);
        formDataToSend.append('address', address);

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
            setfatherName(responseData.data.father_name);
            sethandleAddress(responseData.data.address);

            console.log
        } catch (error) {
            console.log(error);
        }
    }
    // handle pin
    const handlePinSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('pin', pin);

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
            // console.log(responseData);
            setUserData(responseData.data);
            setPin(responseData.data.pin);

        } catch (error) {
            console.log(error);
        }
    }

    if (!userData) {
        return <div>Loading user profile...</div>;
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
                <div className="bg-white shadow-lg rounded-xl mt-4 p-4 md:w-1/2">
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
                <div className="bg-white shadow-lg rounded-xl mt-4 p-4 md:w-1/2">
                    <span className=" text-gray-600">Current (Active) Investment</span>
                    <p><strong>Rs. {userData.investment.active_investment}</strong></p>
                    <p>Rs. {userData.investment.in_active_investment} (In-Active Investment)</p>
                    <p>Rs. {userData.investment.profit} (Available Profit)</p>
                    <div className="flex justify-between">
                        <p className=" text-gray-600"><strong>Expected Sum</strong></p>
                        <p className=" text-yellow-600"><strong>Rs. 14832</strong></p>
                    </div>
                </div>
                    <div className="bg-white shadow-lg rounded-xl mt-4 p-4 md:w-1/2 mb-4">
                        <span>Nominee</span>
                        <p><strong>{userData.nominees.name}</strong></p>
                        <p><strong>S/D/O:</strong> {userData.nominees.father_name}</p>
                        <p><strong>CNIC:</strong> {userData.nominees.cnic}</p>
                        <p><strong>Address:</strong> {userData.nominees.address}</p>
                    </div>
                <Swiper
                slidesPerView={2.3}
                spaceBetween={15}
                // pagination={{
                //     clickable: true,
                // }}
                modules={[Pagination]}
                className="mySwiper"
                breakpoints={{
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4.2,
                    },
                }}
            >


                <SwiperSlide>
                    <Link to={'/investment-history'} state={{id: userData.id}}>
                        <div className="bg-white rounded-lg shadow p-3 pt-8">
                            <img src={ic_money} className="w-24 mx-auto" alt="" />
                            <p className="-mb-1">Investment</p>
                            <p>History</p>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to={'/profit-history'} state={{id: userData.id}}>
                        <div className="bg-white rounded-lg shadow p-3 pt-8">
                            <img src={ic_investment} className="w-24 mx-auto" alt="" />
                            <p className="-mb-1">Profit</p>
                            <p>History</p>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to={'/withdraw-history'} state={{id: userData.id}}>
                        <div className="bg-white rounded-lg shadow p-3 pt-8">
                            <img src={ic_withdraw} className="w-24 mx-auto" alt="" />
                            <p className="-mb-1">WithDraw</p>
                            <p>History</p>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to={'/tax-history'} state={{id: userData.id}}>
                        <div className="bg-white rounded-lg shadow p-3 pt-8">
                            <img src={tax} className="w-24 mx-auto" alt="" />
                            <p className="-mb-1">Tax</p>
                            <p>History</p>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to={'/e-statement'} state={{id: userData.id}}>
                        <div className="bg-white rounded-lg shadow p-3 pt-8">
                            <img src={statment} className="w-24 mx-auto" alt="" />
                            <p className="-mb-1">E</p>
                            <p>Statement</p>
                        </div>
                    </Link>
                </SwiperSlide>

            </Swiper>
            </div>
        )}
    </div>;
};

export default Profile;

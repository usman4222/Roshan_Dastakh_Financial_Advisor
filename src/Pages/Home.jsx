import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo_name.png";
import chip from "../assets/images/chip_.png";
import visa from "../assets/images/visa_.png";
import announcement from "../assets/images/ic_announcement.png";
import enfotrix from "../assets/images/enfotrix_logo.png";
import { FaUsers } from "react-icons/fa";


import { Link, useOutletContext } from "react-router-dom";
import { Announcement, advisorDetails, advisorUsers } from "../Services/GlobalApi";

const Home = () => {
    const [userData] = useOutletContext();
    const [allAnnouncement, setAnnoucement] = useState('');
    const [alladvisorDetails, setadvisorDetails] = useState('');
    const [alladvisorUsers, setadvisorUsers] = useState('');
    const [count, setCount] = useState('');

    useEffect(() => {
        // getAnnoucement();
        if (userData && userData.id) {
            getadvisorDetails();
            getadvisorUsers();
        }
    }, [userData])

    const getAnnoucement = async () => {
        try {
            const response = await fetch(Announcement, {
                method: 'POST'
            });
            const responseData = await response.json();
            setAnnoucement(responseData.data);
            console.log(responseData);
        } catch (error) {
            console.log(error);
        }
    }
    const getadvisorDetails = async () => {
        const formData = new FormData();
        formData.append('advisor_id', userData.id);
        try {
            const response = await fetch(advisorDetails, {
                method: 'POST',
                body: formData
            });
            const responseData = await response.json();
            setadvisorDetails(responseData.data);
            console.log(responseData);
        } catch (error) {
            console.log(error);
        }
    }
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
            setCount(responseData.data.length);
            console.log(responseData);
        } catch (error) {
            console.log(error);
        }
    }

    if (!alladvisorDetails && alladvisorUsers) {
        return <div>Loading accounts...</div>;
    }
    return <div>
        <div className="container mx-auto pt-12 pb-3 min-h-[90vh]">
            <div className="md:grid grid-cols-3 gap-5">
                <div className="flex justify-between bg-light-blue-800 rounded-lg py-2 px-4 text-white md:mb-0 mb-4">
                    {userData && (<>
                        <div className="">
                            <h4 className="text-[22px] font-semibold mb-1">{userData.name} </h4>
                            {/* <h4 className="text-[22px] font-semibold mb-1">Muhammad Hussain </h4> */}
                            <img src={chip} className="w-8 mb-2" alt="" />
                            <p className="text-[10px]">Earning</p>
                            <h3 className="text-[22px] font-semibold">Rs. {userData.profit}</h3>
                        </div>
                        <div className="">
                            {/* <img src={logo} className="w-20 mx-auto mb-8" alt="" /> */}
                            <img src={visa} className="w-16 mx-auto" alt="" />
                        </div>
                    </>
                    )}
                </div>
                {alladvisorDetails && (
                    <div className="">
                        <p className="mb-3 text-gray-400">Clients' Investment</p>
                        <div className="bg-white gap-5 rounded-lg shadow-md py-3 px-4">
                            <div className="flex justify-between mb-1">
                                <p>Active Investment</p>
                                <p>Rs. {alladvisorDetails.active_investment}</p>
                            </div>
                            <div className="flex justify-between mb-1">
                                <p>Available Profit</p>
                                <p>Rs. {alladvisorDetails.profit}</p>
                            </div>
                            <div className="flex justify-between mb-1">
                                <p>In-Active Investment</p>
                                <p>Rs. {alladvisorDetails.inactive_investment}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className=" font-medium">Expected Sum</p>
                                <p className=" font-medium text-yellow-800">Rs. {alladvisorDetails.total}</p>
                            </div>
                        </div>
                    </div>

                )}
            </div>
            <p className="my-3 text-gray-400">Announcement</p>
            <div className="flex bg-white gap-5 rounded-lg shadow-md px-3 py-7 md:w-1/2">
                <img src={announcement} className="w-20" alt="" />
                <p>New app is ready to launch</p>

            </div>
            <p className="my-3 text-gray-400">My Clients'</p>
            <Link to={'/investors'} state={{alladvisorUsers: `${JSON.stringify(alladvisorUsers)}`}}>
                <div className="flex bg-white gap-5 rounded-lg shadow-md px-3 py-7 md:w-1/2">
                    <FaUsers className=" text-[32px] text-blue-700" />
                    <div className="flex justify-between w-full my-auto me-2">

                        <p>Investor Lists</p>
                        {alladvisorUsers && (

                        <p>({count})</p> 
                        )}
                    </div>

                </div>
            </Link>
            {/* <Swiper
                slidesPerView={2.3}
                spaceBetween={15}
                // pagination={{
                //     clickable: true,
                // }}
                modules={[Pagination]}
                className="mySwiper"
                breakpoints={{
                    // When screen width is 768 pixels or less (mobile devices)
                    768: {
                        slidesPerView: 3,
                    },
                    // When screen width is larger than 768 pixels
                    1024: {
                        slidesPerView: 4.2,
                    },
                }}
            >


                <SwiperSlide>
                    <Link to={'/investment-history'}>
                        <div className="bg-white rounded-lg shadow p-3 pt-8">
                            <img src={ic_money} className="w-24 mx-auto" alt="" />
                            <p className="-mb-1">Investment</p>
                            <p>History</p>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to={'/profit-history'}>
                        <div className="bg-white rounded-lg shadow p-3 pt-8">
                            <img src={ic_investment} className="w-24 mx-auto" alt="" />
                            <p className="-mb-1">Profit</p>
                            <p>History</p>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to={'/withdraw-history'}>
                        <div className="bg-white rounded-lg shadow p-3 pt-8">
                            <img src={ic_withdraw} className="w-24 mx-auto" alt="" />
                            <p className="-mb-1">WithDraw</p>
                            <p>History</p>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to={'/tax-history'}>
                        <div className="bg-white rounded-lg shadow p-3 pt-8">
                            <img src={tax} className="w-24 mx-auto" alt="" />
                            <p className="-mb-1">Tax</p>
                            <p>History</p>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to={'/e-statement'}>
                        <div className="bg-white rounded-lg shadow p-3 pt-8">
                            <img src={statment} className="w-24 mx-auto" alt="" />
                            <p className="-mb-1">E</p>
                            <p>Statement</p>
                        </div>
                    </Link>
                </SwiperSlide>

            </Swiper> */}

            <div className="mt-8">
                <img src={enfotrix} className="w-40 mx-auto" alt="" />
            </div>
        </div>
    </div>;
};

export default Home;

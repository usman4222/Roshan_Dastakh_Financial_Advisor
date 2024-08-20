import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet, Navigate } from "react-router-dom";
import { userData } from "../Services/GlobalApi";

const GenralRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggIn') === 'true');
  const [UserData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggIn'));
    if (isLoggedIn) {
      // fetchUserData();
      setUserData(JSON.parse(localStorage.getItem('data')));
    }
  }, [isLoggedIn]);

  const fetchUserData = async () => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(userData, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const responseData = await response.json();
      setUserData(responseData.data);
      // console.log(responseData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return ( <div>
    {isLoading ? (
      <div className="px-5">Loading...</div>
    ) : (
      <>
        <Navbar userData={UserData} />
        
        {isLoggedIn ? (
          <Outlet context={[UserData]} />
        ) : (
          <Navigate to="/login" />
        )}
      </>
    )}
  </div>
);
};

export default GenralRoute;

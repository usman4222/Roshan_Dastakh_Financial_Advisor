import React, { useEffect, useState } from "react";
import { Select, Option, Card, Typography } from "@material-tailwind/react";

import { allTransactions, userDetails } from "../Services/GlobalApi";
import { useLocation } from "react-router-dom";

const TABLE_HEAD = ["Deposit Balance", "Old Balance", "Deposit Date", "Approval Date"];

const InvestmentHistory = () => {
    const [value, setValue] = useState("Approved");
    const location = useLocation();
    const userId = location.state.id;
    const [userData, setUserData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        fetchUserData();
        console.log(userId);
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
            const taxTransactions = responseData.data.transactions.filter(transaction => transaction.type === "Investment");
            setUserData(taxTransactions);

            console.log(responseData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setIsLoading(false);
        }
    };
    if(!userData){
        return <h2>Loading...</h2>
    }
    const handleChange = (newValue) => {
        // setValue(newValue); // Update the state with the new value
        // getInvestmentData(newValue);
    };
    return <div>
        <div className="container mx-auto py-5 min-h-[100vh]">

            <div className="w-72 mx-auto">
                <Select label="Select Version" value={value}
                    onChange={handleChange}>
                    <Option value="Approved">Approved Investments</Option>
                    <Option value="Pending">Pending Investments</Option>
                </Select>
            </div>            
            <p className="my-4 text-center text-[10px]">swipe down or refresh</p>
            <Card className="h-full w-full overflow-auto">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="leading-none opacity-70 font-semibold"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {userData && userData.map((item , index) => {
                            const isLast = index === item.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={index}>
                                    <td className={`${classes} bg-blue-gray-50/50 shadow-sm`}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item.new_balance}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item.previous_balance}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item.created_at}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item.created_at}
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </div>
    </div>;
};

export default InvestmentHistory;

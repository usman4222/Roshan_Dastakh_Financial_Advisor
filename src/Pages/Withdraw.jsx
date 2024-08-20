import React, { useEffect, useState } from "react";
import { Select, Option, Input, Card, Typography } from "@material-tailwind/react";
import { addTransaction, userData } from "../Services/GlobalApi";
import toast, { Toaster } from 'react-hot-toast';

const Withdraw = () => {
    const [value, setValue] = useState("react");
    const [UserData, setUserData] = useState({ accounts: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUserData();
    }, []);

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
    // formdata
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if any required fields are empty
        if (!amount || !phone || !value) {
            setError('Please fill all fields to continue');
            return;
        }

        // Reset error message
        setError('');

        // Create FormData object to send form data
        const formData = new FormData();
        formData.append('amount', amount);
        formData.append('receiver_account_id', value);
        formData.append('sender_account_id', value);
        formData.append('type', 'Withdraw');
        formData.append('receipt', '');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(addTransaction, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Failed to submit form data');
            }
            const responseData = await response.json();

            // console.log(responseData);
            toast.success('Form Submit Successfully!')
            // Reset form fields after successful submission
            setPhone('');
            setAmount('');
            setValue('');

            // Optionally, handle success response
        } catch (error) {
            console.error('Error submitting form:', error);
            // Optionally, handle error response
        }
    };

    if (!UserData) {
        return <div>Loading accounts...</div>;
    }
    return <div>
        <Toaster />
        <div className="container min-h-[100vh] mx-auto py-5">
            <p className="mb-2">Select account fpr withdraw</p>
            <form onSubmit={handleSubmit}>
                <div className="sm:w-72 sm:mx-0 mx-auto">
                    <Select label="Select Account" className="bg-white" value={value}
                        onChange={(val) => setValue(val)}>
                        {UserData && UserData.accounts.map((item, index) => (
                            <Option value={item.account_number} key={index}>
                                {item.bank_name} - {item.account_tittle} - {item.account_number}
                            </Option>
                        ))}
                    </Select>
                </div>
                <p className="mb-2 mt-4">Your registered Phone Number</p>
                <div className="sm:w-72">
                    <Input label="0300000000" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-white" />
                </div>
                <p className="mb-2 mt-4">Enter your withdraw amount</p>
                <div className="sm:w-72">
                    <Input label="Rs.00" type="number" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-white" />
                </div>
                <div className="text-right mt-4">

                    <button
                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-12 rounded-lg bg-blue-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                        type="submit"
                    >
                        Withdraw
                    </button>
                </div>

            </form>
        </div>
    </div>;
};

export default Withdraw;

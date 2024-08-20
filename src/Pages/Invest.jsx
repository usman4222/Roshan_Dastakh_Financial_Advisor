import React, { useEffect, useState } from "react";
import { Select, Option, Input, Card, Typography } from "@material-tailwind/react";
import { addTransaction, adminAccount, userData } from "../Services/GlobalApi";
import toast, { Toaster } from 'react-hot-toast';

const Invest = () => {
    const [value, setValue] = useState("react");
    const [sender, setSender] = useState("react");
    const [UserData, setUserData] = useState({ accounts: [] });
    const [adminAccountData, setAdminAccount] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState('');
    const [receiptBase64, setReceiptBase64] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {
        fetchUserData();
        fetchAdminAccount();
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
    // admin account
    const fetchAdminAccount = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(adminAccount, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const responseData = await response.json();
            setAdminAccount(responseData.data);
            console.log(responseData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReceiptChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setReceiptBase64(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    // formdata
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if any required fields are empty
        if (!amount || !sender || !value || !receiptBase64) {
            setError('Please fill all fields to continue');
            return;
        }

        // Reset error message
        setError('');

        // Create FormData object to send form data
        const formData = new FormData();
        formData.append('amount', amount);
        formData.append('receiver_account_id', value);
        formData.append('sender_account_id', sender);
        formData.append('type', 'Investment');
        // formData.append('receipt', receiptBase64);

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
            setSender('');
            setAmount('');
            setReceiptBase64(null);
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

            <p className="mb-2">Select sender account</p>
            {error && <p className=" text-red-600 mb-3">{error}</p>}
            <form onSubmit={handleSubmit}>

                <div className="sm:w-72 sm:mx-0 mx-auto">
                    <Select label="Select Account" size="lg" name="sender_account_id" className="bg-white" value={sender}
                        onChange={(val) => setSender(val)}>
                        {UserData && UserData.accounts.map((item, index) => (
                            <Option value={item.account_number} key={index}>
                                {item.bank_name} - {item.account_tittle} - {item.account_number}
                            </Option>
                        ))}
                    </Select>
                </div>
                <p className="mb-2 mt-4">Enter your investment amount</p>
                <div className="sm:w-72">
                    <Input label="Rs.00" name="amount" className="bg-white" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <p className="mb-2 mt-4">Add investment receipt</p>
                <div className="sm:w-72">
                    <input name="receipt" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white p-2 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" onChange={handleReceiptChange} />

                </div>
                <p className="mb-3 mt-4 text-[13px]">Please select the account to which you are sending.</p>
                <div className="sm:w-72 sm:mx-0 mx-auto">
                    <Select label="Select Account" name="receiver_account_id" className="bg-white p-3" value={value}
                        onChange={(val) => setValue(val)}>
                        {adminAccountData && adminAccountData.map((item, index) => (
                            <Option value={item.account_number} key={index}>
                                {item.account_number} - {item.account_tittle} - {item.bank_name}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className="text-right mt-4">

                    <button
                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-12 rounded-lg bg-blue-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                        type="submit"
                    >
                        Invest
                    </button>
                </div>
            </form>

        </div>
    </div>;
};

export default Invest;

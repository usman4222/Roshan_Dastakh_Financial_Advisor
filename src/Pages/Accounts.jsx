import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { addAccount, userData } from "../Services/GlobalApi";
import { FaUserPlus } from "react-icons/fa6";
import {
    Button, Dialog, DialogHeader, DialogBody, DialogFooter,
} from "@material-tailwind/react";
import { BsBank2 } from "react-icons/bs";

const Accounts = () => {
    const [UserData, setUserData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState({
        account_tittle: '',
        bank_name: '',
        account_number: '',
    });
    const [error, setError] = useState('');

    const handleOpen = () => setOpen(!open);


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
            console.log(responseData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if any required fields are empty
        if (!formData.bank_name || !formData.account_number || !formData.account_tittle) {
            setError('Please fill all fields to continue');
            return;
        }

        // Reset error message
        setError('');

        // Create FormData object to send form data
        const formDataToSend = new FormData();
        formDataToSend.append('account_tittle', formData.account_tittle);
        formDataToSend.append('bank_name', formData.bank_name);
        formDataToSend.append('account_number', formData.account_number);
        formDataToSend.append('type', 'user');
        // formData.append('receipt', receiptBase64);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(addAccount, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataToSend,
            })

            if (!response.ok) {
                throw new Error('Failed to submit form data');
            }
            const responseData = await response.json();
            fetchUserData();
            // console.log(responseData);
            // Reset form fields after successful submission

            // Optionally, handle success response
        } catch (error) {
            console.error('Error submitting form:', error);
            // Optionally, handle error response
        }
    };
    if (!UserData) {
        return <div>Loading user profile...</div>;
    }
    return <div>

        <div className="container mx-auto p-4 min-h-[90vh] relative">
            {UserData && UserData.accounts.map((item, index) => (

                <div className="flex bg-white rounded-lg md:w-1/2 p-3 justify-between my-3" key={index}>
                    <div className="">
                        <p className=" text-blue-600">{item.bank_name}</p>
                        <p className=" text-light-green-600">{item.account_number}</p>
                        <p className=" text-light-green-600">{item.account_tittle}</p>
                    </div>
                    <MdDeleteForever className=" text-red-500 text-[28px] my-auto" />

                </div>
            ))}
            <div onClick={handleOpen} className=" cursor-pointer bg-light-blue-600 w-12 h-12 rounded-full flex justify-center absolute right-8 bottom-8">
                <FaUserPlus className="my-auto" />
            </div>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Add Bank Account</DialogHeader>
                <p className="px-4 -mt-4">Add bank account details for funds transfer and other services.</p>
                {error && <p className=" text-red-600 mb-3">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <DialogBody>

                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bank</label>
                        <div className="flex mb-4">

                            <button className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg cursor-default dark:text-white dark:border-gray-600" type="button">
                                <BsBank2 />
                            </button>
                            <label className="sr-only">Choose a state</label>
                            <select id="states" name="bank_name" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ">
                                <option >Choose a bank</option>
                                <option value="AlBaraka Bank (Pakistan) Limited">AlBaraka Bank (Pakistan) Limited</option>
                                <option value="Allied Bank Limited">Allied Bank Limited</option>
                                <option value="Askari Bank Limited">Askari Bank Limited</option>
                                <option value="Bank AL Habib Limited">Bank AL Habib Limited</option>
                                <option value="Bank Alfalah Limited">Bank Alfalah Limited</option>
                                <option value="The Bank of Khyber">The Bank of Khyber</option>
                                <option value="The Bank of Punjab">The Bank of Punjab</option>
                                <option value="BankIslami Pakistan Limited">BankIslami Pakistan Limited</option>
                                <option value="Citibank N.A.">Citibank N.A.</option>
                                <option value="Deutsche Bank AG">Deutsche Bank AG</option>
                                <option value="Dubai Islamic Bank Pakistan Limited">Dubai Islamic Bank Pakistan Limited</option>
                                <option value="Faysal Bank Limited">Faysal Bank Limited</option>
                                <option value="First Women Bank Limited">First Women Bank Limited</option>
                                <option value="Habib Bank Limited">Habib Bank Limited</option>
                                <option value="Habib Metropolitan Bank Limited">Habib Metropolitan Bank Limited</option>
                                <option value="Industrial and Commercial Bank of China Limited">Industrial and Commercial Bank of China Limited</option>
                                <option value="Industrial Development Bank of Pakistan">Industrial Development Bank of Pakistan</option>
                                <option value="JS Bank Limited">JS Bank Limited</option>
                                <option value="Meezan Bank Limited">Meezan Bank Limited</option>
                                <option value="MCB Bank Limited">MCB Bank Limited</option>
                                <option value="MCB Islamic Bank">MCB Islamic Bank</option>
                                <option value="National Bank of Pakistan">National Bank of Pakistan</option>
                                <option value="Punjab Provincial Cooperative Bank Ltd.">Punjab Provincial Cooperative Bank Ltd.</option>
                                <option value="Samba Bank Limited">Samba Bank Limited</option>
                                <option value="Sindh Bank Limited">Sindh Bank Limited</option>
                                <option value="Silkbank Limited">Silkbank Limited</option>
                                <option value="SME Bank Limited">SME Bank Limited</option>
                                <option value="Soneri Bank Limited">Soneri Bank Limited</option>
                                <option value="Standard Chartered Bank (Pakistan) Ltd">Standard Chartered Bank (Pakistan) Ltd</option>
                                <option value="Summit Bank Limited">Summit Bank Limited</option>
                                <option value="The Bank of Tokyo-Mitsubishi UFJ Ltd.">The Bank of Tokyo-Mitsubishi UFJ Ltd.</option>
                                <option value="United Bank Limited">United Bank Limited</option>
                                <option value="Zarai Taraqiati Bank Ltd.">Zarai Taraqiati Bank Ltd.</option>

                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account Title</label>
                            <input type="text" id="account" name="account_tittle" onChange={handleChange} value={formData.account_tittle} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bank Account" required />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account Number</label>
                            <input type="number" id="number" name="account_number" onChange={handleChange} value={formData.account_number} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1234XXXXXXXXXXX" required />
                        </div>

                    </DialogBody>
                    <DialogFooter>
                        <Button variant="gradient" color="blue" className="w-full" type="submit" onClick={handleOpen}>
                            <span>ADD</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </div>
    </div>;
};

export default Accounts;

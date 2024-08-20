import React, { useEffect, useState } from "react";
import { UpdateNominee, addNominee, userData as userDataEndpoint } from "../Services/GlobalApi";
import { useNavigate } from "react-router-dom";

const Nominee = () => {
    const navigate = useNavigate();
    const [UserData, setUserData] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        father_name: '',
        phone: '',
        cnic: '',
        address: '',
        user_relation: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(userDataEndpoint, {
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
            setFormData({
                name: responseData.data.nominees.name,
                father_name: responseData.data.nominees.father_name,
                phone: responseData.data.nominees.phone,
                cnic: responseData.data.nominees.cnic,
                address: responseData.data.nominees.address,
                user_relation: responseData.data.nominees.user_relation,
            });
            console.log(responseData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('father_name', formData.father_name);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('cnic', formData.cnic);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('user_relation', formData.user_relation);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(UpdateNominee, {
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
            console.log(responseData);
            navigate('/profile');
            // Reset form fields after successful submission

            // Optionally, handle success response
        } catch (error) {
            console.error('Error submitting form:', error);
            // Optionally, handle error response
        }
    }

    if (!UserData) {
        return <div>Loading user profile...</div>;
    }
    return (
        <div>
            {UserData && (

                <div className="container mx-auto p-4 min-h-[95vh]">
                    <h1 className="md:text-left text-center"><strong>Nominee Details</strong></h1>
                    <form onSubmit={handleSubmit} className="md:w-1/2">
                        <div className=" mt-4 mb-3">
                            <label className="block mb-2 text-sm font-medium text-cyan-700">Relation</label>
                            <select name="user_relation" value={formData.user_relation} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="Father">Father</option>
                                <option value="Brother">Brother</option>
                                <option value="Son">Son</option>
                            </select>
                        </div>
                        
                        <div className="mb-3">
                            <label className="block mb-2 text-sm font-medium text-cyan-700 dark:text-white">Full Name</label>
                            <input type="text" name="name" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Full Name" value={formData.name} required />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-2 text-sm font-medium text-cyan-700 dark:text-white">Father Name</label>
                            <input type="text" name="father_name" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Father Name" value={formData.father_name}  />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-2 text-sm font-medium text-cyan-700 dark:text-white">Phone Number</label>
                            <input type="text" name="phone" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone Number" value={formData.phone} required />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-2 text-sm font-medium text-cyan-700 dark:text-white">CNIC</label>
                            <input type="text" name="cnic" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="CNIC" value={formData.cnic} required />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-2 text-sm font-medium text-cyan-700 dark:text-white">Postal Address</label>
                            <input type="text" name="address" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Postal Address" value={formData.address} required />
                        </div>
                        <button type="submit" className="focus:outline-none w-full mt-3 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Purple</button>
                    </form>

                </div>
            )}
        </div>
    );
};

export default Nominee;

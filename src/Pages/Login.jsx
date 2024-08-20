import React, { useState } from "react";
import NavBar from "../components/Navbar";
import { LoginApi } from "../Services/GlobalApi";
import { useNavigate } from "react-router-dom";
const Login = () => {
    
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        cnic: '',
        pin: '',
    });
    const [previousValue, setPreviousValue] = useState('');
    const handleCnicInput = (event) => {
        let input = event.target.value.replace(/\D/g, '');

        if (event.nativeEvent.inputType === 'deleteContentBackward') {
            if (previousValue.endsWith('-') && !input.endsWith('-')) {
                input = previousValue.slice(0, -1);
            }
        } else {
            if (input.length > 13) {
                input = input.slice(0, 13);
            }
            if (input.length > 5) {
                input = input.slice(0, 5) + '-' + input.slice(5, 12) + '-' + input.slice(12, 13);
            }
        }

        event.target.value = input;
        setPreviousValue(input);
        setFormData({ ...formData, cnic: input });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const cnicDigits = formData.cnic.replace(/\D/g, '');
        if (cnicDigits.length !== 13) {
            setErrorMessage('Invalid CNIC. Please enter a 13-digit CNIC.');
            return;
        }
        
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('cnic', formData.cnic);
            formDataToSend.append('pin', formData.pin);
            const response = await fetch(LoginApi, {
                method: 'POST',
                body: formDataToSend,
            });
            const responseData = await response.json();
            console.log(responseData.data);
            if (responseData.success) {
                // console.log('Login successful');
                localStorage.setItem('data', JSON.stringify(responseData.data));
                localStorage.setItem('isLoggIn', 'true');
                navigate('/');

            } else {
                console.error('Login failed');
                setErrorMessage(responseData.data.error);
            }


        } catch (error) {
            console.error('Error:', error);

        }
    }
    return <div>
        <NavBar />
        <div className="">
            <section className="bg-gray-200 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            {errorMessage ? (
                                <h1 className="text-center font-bold leading-tight tracking-tight text-red-500  dark:text-white">
                                    {errorMessage}
                                </h1>
                            ) : ''}
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label for="cnic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your CNIC</label>
                                    <input type="text" onInput={handleCnicInput}  onChange={handleChange} value={formData.cnic} name="cnic" id="cnic" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="00000-0000000-0" required="" />
                                </div>
                                <div>
                                    <label for="pin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PIN</label>
                                    <input type="password" onChange={handleChange} value={formData.pin} name="pin" id="pin" placeholder="••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>;
};

export default Login;

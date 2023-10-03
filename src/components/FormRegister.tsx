import React, { useState } from 'react';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerUser } from '../hooks/AuthSlice';
import { AppDispatch } from '../hooks/store';
import { useNavigate } from 'react-router-dom';

const registerSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    name: yup.string().required('Username is required'),
    password: yup.string().min(4, 'Password must be at least 4 characters long').required('Password is required'),
});

const FormRegister: React.FC = () => {
    const [formData, setFormData] = useState({ email: '', name: '', password: '' });
    const [errors, setErrors] = useState<{ email?: string; name?: string; password?: string }>({});

    const dispatch: AppDispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await registerSchema.validate(formData, { abortEarly: false });
            dispatch(registerUser(formData));
            navigate("/");
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const errorMessages: { [key: string]: string } = {};
                error.inner.forEach(err => {
                    errorMessages[err.path as string] = err.message;
                });
                setErrors(errorMessages);
            }
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className='w-[450px]'>
            <h2 className='mb-8 uppercase text-4xl font-semibold text-gray-400'>
                Register Form
            </h2>
            <form className='p-1' onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email address</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" 
                        value={formData.email} 
                        onChange={handleChange}
                    />
                    {errors.email && <span className='text-sm text-red-300 mt-2 inline-block'>{errors.email}</span>}
                </div>
                
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Username</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" 
                        value={formData.name} 
                        onChange={handleChange}
                    />
                    {errors.name && <span className='text-sm text-red-300 mt-2 inline-block'>{errors.name}</span>}
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" 
                        value={formData.password} 
                        onChange={handleChange}
                    />
                    {errors.password && <span className='text-sm mt-2 text-red-300 inline-block'>{errors.password}</span>}
                </div>
                <button type="submit" className="text-white duration-300 transition-all ease-in-out focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Register</button>
            </form>
        </div>
    );

};

export default FormRegister;
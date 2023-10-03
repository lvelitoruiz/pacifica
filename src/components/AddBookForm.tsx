import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../hooks/BooksSlice';
import * as yup from 'yup';
import { AppDispatch } from '../hooks/store';
import { useNavigate } from 'react-router-dom';

const bookSchema = yup.object().shape({
    title: yup.string().required('Title is required').min(3, 'Title should be at least 3 characters long'),
    author: yup.string().required('Author is required').min(3, 'Author should be at least 3 characters long'),
    description: yup.string().required('Description is required').min(10, 'Description should be at least 10 characters long'),
});

const AddBookForm: React.FC = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: ''
    });
    const [errors, setErrors] = useState<{ title?: string; author?: string; description?: string }>({});
    const dispatch: AppDispatch = useDispatch();

    const navigate = useNavigate(); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await bookSchema.validate(formData, { abortEarly: false });
            dispatch(addBook(formData));
            setErrors({});
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className='w-[450px]'>
            <h2 className='mb-8 uppercase text-4xl font-semibold text-gray-400'>
                Add Book
            </h2>
            <form className='p-1' onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-white">Title</label>
                    <input type="text" name="title" id="title" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" value={formData.title} onChange={handleChange} />
                    {errors.title && <span className='text-sm text-red-300 mt-2 inline-block'>{errors.title}</span>}
                </div>
                <div className="mb-6">
                    <label htmlFor="author" className="block mb-2 text-sm font-medium text-white">Author</label>
                    <input type="text" name="author" id="author" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" value={formData.author} onChange={handleChange} />
                    {errors.author && <span className='text-sm text-red-300 mt-2 inline-block'>{errors.author}</span>}
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-white">Description</label>
                    <input type="text" name="description" id="description" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" value={formData.description} onChange={handleChange} />
                    {errors.description && <span className='text-sm text-red-300 mt-2 inline-block'>{errors.description}</span>}
                </div>
                <button type="submit" className="text-white duration-300 transition-all ease-in-out focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Add Book</button>
            </form>
        </div>
    );
};

export default AddBookForm;

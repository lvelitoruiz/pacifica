import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../hooks/store';
import { updateBook } from '../hooks/BooksSlice';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const bookSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    author: yup.string().required('Author is required'),
    description: yup.string().required('Description is required')
});

interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
};

const EditBookForm: React.FC<{ bookId: number }> = ({ bookId }) => {
    const dispatch: AppDispatch = useDispatch();
    const book = useSelector((state: RootState) => state.books.books.find(b => b.id === bookId));

    const navigate = useNavigate();

    const [formData, setFormData] = useState<Book>({
        id: bookId,
        title: '',
        author: '',
        description: ''
    });
    const [errors, setErrors] = useState<{ title?: string; author?: string; description?: string }>({});

    useEffect(() => {
        if (book) {
            setFormData(book);
        }
    }, [book]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await bookSchema.validate(formData, { abortEarly: false });
            dispatch(updateBook(formData));
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
            <h2 className='mb-8 uppercase text-4xl font-semibold text-gray-400'>Edit Book</h2>
            <form className='p-1' onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-white">Title</label>
                    <input type="text" name="title" id="title" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Book Title" value={formData.title} onChange={handleChange} />
                    {errors.title && <span className='text-sm text-red-300 mt-2 inline-block'>{errors.title}</span>}
                </div>

                <div className="mb-6">
                    <label htmlFor="author" className="block mb-2 text-sm font-medium text-white">Author</label>
                    <input type="text" name="author" id="author" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Author Name" value={formData.author} onChange={handleChange} />
                    {errors.author && <span className='text-sm text-red-300 mt-2 inline-block'>{errors.author}</span>}
                </div>

                <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-white">Description</label>
                    <input type="text" name="description" id="description" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Description" value={formData.description} onChange={handleChange} />
                    {errors.description && <span className='text-sm text-red-300 mt-2 inline-block'>{errors.description}</span>}
                </div>

                <button type="submit" className="text-white duration-300 transition-all ease-in-out focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Update Book</button>
            </form>
        </div>
    );
};

export default EditBookForm;
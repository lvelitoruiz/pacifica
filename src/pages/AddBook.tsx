import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../hooks/store';
import AddBookForm from '../components/AddBookForm';

const AddBook = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    if (isAuthenticated) {
        return (
            <div className='flex justify-center items-center min-h-screen pt-28 pb-16'>
                <AddBookForm />
            </div>
        )
    } else {
        return <Navigate to="/login" />;
    }
}

export default AddBook

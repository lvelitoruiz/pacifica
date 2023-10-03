import React from 'react'
import EditBookForm from '../components/EditBookForm'
import { useLocation } from 'react-router-dom';

const EditBook = () => {
    let { state } = useLocation();
    
    return (
        <div className='flex justify-center items-center min-h-screen pt-28 pb-16'>
            <EditBookForm bookId={state.id} />
        </div>
    )
}

export default EditBook

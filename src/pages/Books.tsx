import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import Table from '../components/Table';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../hooks/store';
import { fetchBooks } from '../hooks/BooksSlice';
import Pagination from '../components/Pagination';

interface book {
    id: number,
    title: string,
    author: string,
    description: string
}

const Books = () => {
    const dispatch: AppDispatch = useDispatch();

    const [bookList, setBookList] = useState<book[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const token = useSelector((state: RootState) => state.auth.token);


    const books = useSelector((state: RootState) => state.books.books);
    const loading = useSelector((state: RootState) => state.books.loading);
    const error = useSelector((state: RootState) => state.books.error);

    useEffect(() => {
        if (token !== null) {
            dispatch(fetchBooks(token));
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (books !== null && books !== undefined) {
            setBookList(books);
        }
    }, [books])

    if (isAuthenticated) {

        if (loading) return <div>Loading...</div>
        if (error) return <div>Error: {error}</div>

        return (
            <div className='container pt-28 pb-16 mx-auto'>
                <h2 className='mb-8 uppercase text-4xl font-semibold text-gray-400 text-center'>List of Books</h2>
                <Table bookList={bookList.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage)} />
                <Pagination totalItems={bookList.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage} />
            </div>
        )
    } else {
        return <Navigate to="/login" />;
    }
}

export default Books

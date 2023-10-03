import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import { deleteBook } from '../hooks/BooksSlice';
import { AppDispatch } from '../hooks/store';


interface book {
    id: number,
    title: string,
    author: string,
    description: string
}

interface tableProperties {
    bookList: book[],
}

const Table = ({ bookList }: tableProperties) => {

    const dispatch: AppDispatch = useDispatch();

    const handleDelete = (bookId: number) => {
        dispatch(deleteBook({ id: bookId }));
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-8/12 mx-auto">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 bg-gray-800">
                            Book title
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-700">
                            Author
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-800">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-700">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookList !== null && bookList !== undefined && bookList.map((book) => {
                            return (
                                <tr className="border-t border-gray-500" key={book.id}>
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white bg-gray-800">
                                        {book.title}
                                    </th>
                                    <td className="px-6 py-4 bg-gray-700">
                                        {book.author}
                                    </td>
                                    <td className="px-6 py-4 bg-gray-800">
                                        {book.description}
                                    </td>
                                    <td className="px-6 py-4 bg-gray-700">
                                        <div className='w-full flex justify-between'>
                                            <Link to="/edit" state={{ id: book.id }} className='hover:text-white'><FontAwesomeIcon icon={faPenToSquare} /></Link>
                                            <span className='hover:text-white cursor-pointer' onClick={() => handleDelete(book.id)}><FontAwesomeIcon icon={faTrashCan} /></span>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table

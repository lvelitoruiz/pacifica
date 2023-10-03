import React from 'react'

interface paginationProperties {
    totalItems: number,
    itemsPerPage: number,
    currentPage: number,
    onPageChange: (page: number) => void,
}

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }: paginationProperties) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <nav className="flex items-center justify-center mt-10">
            <ul className="inline-flex gap-1 text-sm">
                {[...Array(totalPages)].map((item, index) => (
                    <li>
                        <span
                            key={index}
                            className={`cursor-pointer flex items-center justify-center px-3 h-8 ml-0 leading-tight border rounded-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white ${currentPage === index + 1 ? 'bg-gray-900' : ''}`}
                            onClick={() => onPageChange(index + 1)}
                        >
                            {index + 1}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { RootState, persistor } from '../hooks/store';
import { logout } from '../hooks/AuthSlice';
import { AppDispatch } from '../hooks/store';

const Header = () => {
    const [open, setOpen] = useState(false);
    const [openResponsive, setOpenResponsive] = useState(false);

    const dispatch: AppDispatch = useDispatch();

    const displayName = useSelector((state: RootState) => state.auth.displayName);
    const username = useSelector((state: RootState) => state.auth.username);

    const initials = displayName?.split(' ').map((word: string) => word[0]).join('').toUpperCase();

    const handleMenu = () => {
        setOpen(!open);
    }

    const handleMenuResponsive = () => {
        setOpenResponsive(!openResponsive);
    }

    const handleLogout = () => {
        dispatch(logout());
        persistor.purge();
    }

    return (

        <nav className="border-gray-200 fixed left-0 top-0 z-20 w-full bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
                <Link to="#" className="flex items-center">
                    <img src="https://freelogo.me/data/files/freelogo-blue.png" className="h-8 mr-3" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Pacifica</span>
                </Link>
                <div className="flex items-center md:order-2">
                    <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-600" onClick={() => handleMenu()} data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        <div className='w-8 h-8 rounded-full flex items-center justify-center text-white'>{initials}</div>
                    </button>

                    <div className={`${open ? "block" : "hidden"} absolute right-2 top-[90%] z-50 mb-4 text-base list-none divide-y rounded-lg shadow bg-gray-700 divide-gray-600`} id="user-dropdown">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-white">{displayName}</span>
                            <span className="block text-sm truncate text-gray-400">{username}</span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li onClick={() => handleLogout()}>
                                <span className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">LogOut</span>
                            </li>
                        </ul>
                    </div>
                    <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" onClick={() => handleMenuResponsive()}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`${openResponsive ? "block absolute top-[100%] left-0 gap-0" : "hidden"}  items-center justify-between w-[100%] md:flex md:w-auto md:order-1`} id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-0 gap-4 border rounded-b-lg md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
                        <li>
                            <NavLink to="/" className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0 md:text-blue-500" : "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0"
                            } aria-current="page">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/add" className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0 md:text-blue-500" : "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0"
                            }>Add Book</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >

    )
}

export default Header

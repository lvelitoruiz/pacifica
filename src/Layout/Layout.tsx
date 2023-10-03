import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    return (
        <div className='w-screen min-h-screen bg-gray-600'>
            <Header />
            <Outlet />
        </div>
    );
};

export default Layout;

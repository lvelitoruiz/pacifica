import React from 'react';
import { Outlet } from 'react-router-dom';

const LayoutAlternative: React.FC = () => {
    return (
        <div className='w-screen min-h-screen bg-gray-600 flex justify-center items-center'>
            <Outlet />
        </div>
    );
};

export default LayoutAlternative;

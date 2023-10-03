import React from 'react'
import FormRegister from '../components/FormRegister';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../hooks/store';

const Register = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return (
            <FormRegister />
        )
    } else {
        return <Navigate to="/" />;
    }
}

export default Register

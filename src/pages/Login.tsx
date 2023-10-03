import React from 'react'
import { Navigate } from 'react-router-dom';
import FormLogin from '../components/FormLogin';
import { useSelector } from 'react-redux';
import { RootState } from '../hooks/store';

const Login = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return (
            <FormLogin />
        )
    } else {
        return <Navigate to="/" />;
    }
}

export default Login

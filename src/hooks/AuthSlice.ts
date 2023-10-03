import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type AuthState = {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    displayName: string | null;
    initials: string | null;
    token: string | null;
    username: string | null;
};

const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    error: null,
    displayName: null,
    initials: null,
    token: null,
    username: null,
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: { email: string; password: string }) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}auth/signin`, credentials, {
            withCredentials: true,
        });
        return response.data;
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (credentials: { email: string; password: string, name: string }) => {
        console.log(credentials);
        const response = await axios.post(`${process.env.REACT_APP_API_URL}auth/signup`, credentials, {
            withCredentials: true,
        });
        return response.data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.loading = false;
                state.displayName = action.payload.displayname;
                state.token = action.payload.token;
                state.username = action.payload.username;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.loading = false;
                state.error = action.error.message || null;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.isAuthenticated = false;
                state.loading = false;
                state.displayName = action.payload.displayname;
                state.token = action.payload.token;
                state.username = action.payload.username;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.loading = false;
                state.error = action.error.message || null;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { loadStripe } from "@stripe/stripe-js"

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || ""


const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    user: JSON.parse(localStorage.getItem('user')) || "",
    stripePromise: loadStripe(STRIPE_PUB_KEY)
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = "";
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.removeItem('user');
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import favouriteReducer from '../features/favourites/favouriteSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        favourite: favouriteReducer,
    },
});
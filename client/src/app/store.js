import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import favouriteReducer from '../features/favourites/favouriteSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        favourite: favouriteReducer,
        cart: cartReducer,
    },
});
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favourites: JSON.parse(localStorage.getItem('favourites')) || [],
};

export const favouriteSlice = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            const product = action.payload;
            const isAlreadyFavorite = state.favourites.some(fav => fav._id === product._id);
            if (!isAlreadyFavorite) {
                state.favourites.push(product);
            }
        },
        removeFromFavorites: (state, action) => {
            const productId = action.payload;
            state.favourites = state.favourites.filter(fav => fav._id !== productId);
        },
        setFavorites: (state, action) => {
            state.favourites = action.payload;
        },
    },
});

export const { addToFavorites, removeFromFavorites, setFavorites } = favouriteSlice.actions;

export default favouriteSlice.reducer;
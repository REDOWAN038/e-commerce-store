import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    brands: [],
    maxPrice: "",
    sortOption: ""
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.stars = action.payload
        },
        setBrands: (state, action) => {
            state.hotelTypes = action.payload
        },
        setMaxPrice: (state, action) => {
            state.maxPrice = action.payload
        },
        setSortOption: (state, action) => {
            state.sortOption = action.payload
        },
    },
});

export const { setCategories, setBrands, setMaxPrice, setSortOption } = filterSlice.actions;

export default filterSlice.reducer;
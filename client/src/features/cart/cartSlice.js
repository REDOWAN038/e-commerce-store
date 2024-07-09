import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../utils/cart";

const initialState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [], shippingAddress: {}, buyerDetails: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // eslint-disable-next-line no-unused-vars
            const { user, rating, reviews, ...item } = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existItem._id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            return updateCart(state, item);
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            return updateCart(state);
        },

        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
        },

        saveBuyerDetails: (state, action) => {
            state.buyerDetails = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
        },

        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    savePaymentMethod,
    saveShippingAddress,
    saveBuyerDetails
    // clearCartItems,
    // resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
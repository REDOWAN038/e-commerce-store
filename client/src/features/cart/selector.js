export const selectCartItems = (state) => state.cart.cartItems;
export const selectShippingAddress = (state) => state.cart.shippingAddress;
export const selectPaymentMethod = (state) => state.cart.paymentMethod;
export const selectItemsPrice = (state) => state.cart.itemsPrice;
export const selectShippingPrice = (state) => state.cart.shippingPrice;
export const selectTaxPrice = (state) => state.cart.taxPrice;
export const selectTotalPrice = (state) => state.cart.totalPrice;
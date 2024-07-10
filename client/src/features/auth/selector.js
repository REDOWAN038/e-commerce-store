export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user.userWithOutPassword;
export const selectStripePromise = (state) => state.auth.stripePromise;

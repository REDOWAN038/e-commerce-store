// Add a product to a localStorage
export const addFavoriteToLocalStorage = (product) => {
    const favorites = getFavoritesFromLocalStorage();
    if (!favorites.some((p) => p._id === product._id)) {
        favorites.push(product);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
};

// check is favourite
export const isFavourite = (productId) => {
    const favorites = getFavoritesFromLocalStorage();
    const isAdded = favorites.some((p) => p._id === productId)
    if (isAdded) {
        return true
    }
    return false
};

// Remove  product from a localStorage
export const removeFavoriteFromLocalStorage = (productId) => {
    const favorites = getFavoritesFromLocalStorage();
    const updateFavorites = favorites.filter(
        (product) => product._id !== productId
    );

    localStorage.setItem("favorites", JSON.stringify(updateFavorites));
};

// Retrive favorites from a localStorage
export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem("favorites");
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};
const constructQuery = (queryParams) => {
    let constructedQuery = {};

    if (queryParams.search) {
        const searchRegExp = new RegExp(".*" + queryParams.search + ".*", "i")
        constructedQuery.name = { $regex: searchRegExp }
    }

    if (queryParams.brands) {
        constructedQuery.brand = {
            $in: queryParams.brands
        };
    }

    if (queryParams.categories) {
        constructedQuery.category = {
            $in: queryParams.categories
        };
    }

    // if (queryParams.ratings) {
    //     const productRatings = Array.isArray(queryParams.ratings)
    //         ? queryParams.ratings.map((rating) => parseInt(rating, 10))
    //         : [parseInt(queryParams.ratings, 10)];

    //     constructedQuery.rating = { $in: productRatings };
    // }

    if (queryParams.maxPrice) {
        constructedQuery.price = {
            $lte: parseInt(queryParams.maxPrice).toString(),
        };
    }

    return constructedQuery;
};

module.exports = {
    constructQuery
}
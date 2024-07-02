const constructQuery = (queryParams) => {
    let constructedQuery = {};

    if (queryParams.search) {
        const searchRegExp = new RegExp(".*" + queryParams.search + ".*", "i")
        constructedQuery.name = { $regex: searchRegExp }
    }

    if (queryParams.brand) {
        constructedQuery.brand = {
            $all: Array.isArray(queryParams.brand)
                ? queryParams.brand
                : [queryParams.brand],
        };
    }

    // if (queryParams.types) {
    //     constructedQuery.type = {
    //         $in: Array.isArray(queryParams.types)
    //             ? queryParams.types
    //             : [queryParams.types],
    //     };
    // }

    if (queryParams.ratings) {
        const productRatings = Array.isArray(queryParams.ratings)
            ? queryParams.ratings.map((rating) => parseInt(rating, 10))
            : [parseInt(queryParams.ratings, 10)];

        constructedQuery.rating = { $in: productRatings };
    }

    if (queryParams.maxPrice) {
        constructedQuery.price = {
            $lte: parseInt(queryParams.maxPrice).toString(),
        };
    }

    if (queryParams.minPrice) {
        constructedQuery.price = {
            $gte: parseInt(queryParams.minPrice).toString(),
        };
    }

    return constructedQuery;
};

module.exports = {
    constructQuery
}
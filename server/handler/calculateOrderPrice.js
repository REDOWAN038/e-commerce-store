const calculateOrderPrices = (orderItems) => {
    const itemsPrice = orderItems.reduce(
        (acc, item) => acc + item.price * item.orderQuantity,
        0
    );

    const shippingPrice = 10;
    const taxRate = 0.15;
    const taxPrice = (itemsPrice * taxRate).toFixed(2);

    const totalPrice = (
        itemsPrice +
        shippingPrice +
        parseFloat(taxPrice)
    ).toFixed(2);

    return {
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice,
        totalPrice,
    };
}

module.exports = { calculateOrderPrices }
const success = 0;
const fail = 1;

export const getListOfExistingOrders = async (userID) => {
	const response = await fetch(`/orders/${userID}`, {
		headers: {
			Accept: "application/json",
		},
	});
	if (response.status === 500)
		return {
			status: fail,
			listOfOrders: null,
		};

	const listOfOrders = await response.json();

	return {
		status: success,
		listOfOrders: listOfOrders,
	};
};

export const fetchOrderDetails = async (orderId) => {
	const response = await fetch(`/order/${orderId}`, {
		headers: {
			Accept: "application/json",
		},
	});

	if (response.status === 500)
		return {
			status: fail,
			orderDetails: null,
		};

	const orderDetails = await response.json();
	return {
		status: success,
		orderDetails: orderDetails,
	};
};

export const registerNewOrder = async (order, context) => {
	const response = await fetch("/registerOrder", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ order: order }),
	});

	if (response.status !== 200)
		return {
			status: fail,
			orderID: null,
		};

	const result = await response.json();

	if (result.orderID) {
		context.emptyCart();
		return {
			status: success,
			orderID: result.orderID,
		};
	}
};

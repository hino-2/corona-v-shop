import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import "./style.scss";

const OrderDetails = ({ match }) => {
	const [order, setOrder] = useState({});
	let productsGroups = new Set();
	let productTable = [];

	console.log(order);
	useEffect(() => {
		(async function () {
			const orderDetails = await fetchOrderDetails(match.params.orderId);
			setOrder(orderDetails);
		})();
	}, []);

	if (order.listOfProducts) {
		order.listOfProducts.forEach((product) => productsGroups.add(product.name));

		productsGroups.forEach((name) => {
			productTable.push({
				name: name,
				category: order.listOfProducts.find((item) => item.name === name).category,
				amount: order.listOfProducts.filter((item) => item.name === name).length,
				pricePerUnit: order.listOfProducts.find((item) => item.name === name).price,
				priceTotal: Number(
					order.listOfProducts
						.filter((item) => item.name === name)
						.reduce((total, item) => {
							return (total += item.price);
						}, 0)
						.toFixed(2)
				),
			});
		});
	}

	console.log(productTable);

	const fetchOrderDetails = async (orderId) => {
		const result = await fetch(`/order/${orderId}`, {
			headers: {
				Accept: "application/json",
			},
		});

		return await result.json();
	};

	return (
		<div className="order">
			<div className="order-id">Заказ № {order.orderID}</div>
			<div className="product-li">
				<div className="header">Товар</div>
				<div className="header">Категория</div>
				<div className="header">Кол-во</div>
				<div className="header">Цена за шт.</div>
				<div className="header">Общая цена</div>
				{productTable.map((product) => (
					<React.Fragment key={uniqid()}>
						<div className="product-li-cell" key={uniqid()}>
							{product.name}
						</div>
						<div className="product-li-cell" key={uniqid()}>
							{product.category}
						</div>
						<div className="product-li-cell" key={uniqid()}>
							{product.amount}
						</div>
						<div className="product-li-cell" key={uniqid()}>
							{product.pricePerUnit}
						</div>
						<div className="product-li-cell" key={uniqid()}>
							{product.priceTotal}
						</div>
					</React.Fragment>
				))}
			</div>
			<div className="total">Итого {order.total} ₽</div>
		</div>
	);
};

export default OrderDetails;

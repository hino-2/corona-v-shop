import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import { fetchOrderDetails } from "../../logic/orderManagement";
import "./style.scss";

const OrderDetails = ({ match }) => {
	const [order, setOrder] = useState({ orderDetails: { details: [] } });
	const [message, setMessage] = useState("");

	useEffect(() => {
		(async function () {
			const result = await fetchOrderDetails(match.params.orderId);
			if (result.status !== 0) {
				setMessage(messages[`${result.status}`]);
				return;
			}

			if (result.status === 0) setOrder(result);
		})();
	}, []);

	return (
		<div className="order">
			<div className="order-id">Заказ № {order.orderID}</div>
			<div className="product-li">
				<div className="header">Товар</div>
				<div className="header">Категория</div>
				<div className="header">Кол-во</div>
				<div className="header">Цена за шт.</div>
				<div className="header">Общая цена</div>
				{order.orderDetails.details.map((product) => (
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
			<div style={{ marginTop: "30px" }}>{message}</div>
		</div>
	);
};

export default OrderDetails;

const messages = {
	"1": (
		<div className="message">
			Не удалось получить информацию о заказе
			<br />
			Жаловаться сюда:&nbsp;
			<a href="mailto:info-corona@mail.ru">почта для жалований</a>
		</div>
	),
};

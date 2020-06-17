import React, { useContext } from "react";
import { GeneralContext } from "../GeneralContext";
import { thereIsALoggedInUser } from "../../logic/userManagement";

const OrderRegistered = (props) => {
	const context = useContext(GeneralContext);

	if (!props.history.location.state) return null;

	window.scroll({
		top: 0,
		left: 0,
		behavior: "smooth",
	});

	const {
		location: {
			state: { orderID },
		},
	} = props;

	return (
		<div style={{ textAlign: "center", color: "white", fontSize: "48px", height: "600px", marginTop: "50px" }}>
			Ваш заказ
			<br />
			№&nbsp;
			<font style={{ color: "#f67e22" }}>{orderID}</font>
			&nbsp;(LOL)
			<br />
			отправлен нашему менеджеру (нет)
			{thereIsALoggedInUser(context) ? (
				<>
					,<br />а письмо с заказом вам на почту (да)
					<br />
				</>
			) : (
				""
			)}
			<br />
			<br />
			Спасибо за покупку
			<br />
			Заходите к нам еще
		</div>
	);
};

export default OrderRegistered;

import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { GeneralContext } from "../GeneralContext";
import { registerNewOrder } from "../../logic/orderManagement";
import { ecomStartWidget } from "./widget";
import "./style.scss";

const useStyles = makeStyles({
	root: {
		//   background: 'linear-gradient(270deg, #BE2E00 0%, #BA6400 100%);',
		background: "#df641a",
		borderRadius: 3,
		border: 0,
		color: "white",
		height: 50,
		width: 280,
		lineHeight: "normal",
		padding: "0 20px",
		minWidth: "100px",
		transition: "0.3s all",
		"&$disabled": {
			background: "rgba(0, 0, 0, 0.12)",
			color: "white",
			boxShadow: "none",
		},
		"&:hover": {
			transform: "scale(1.2)",
			backgroundColor: "#df641a",
			transition: "0.3s all",
		},
	},
	label: {
		textTransform: "capitalize",
	},
	disabled: {
		background: "grey",
	},
});

const Checkout = () => {
	const context = useContext(GeneralContext);
	const history = useHistory();
	const cart = context.cart;

	const [deliveryAddress, setDeliveryAddress] = useState("");
	const [deliveryPrice, setDeliveryPrice] = useState("");
	const [deliveryData, setDeliveryData] = useState("");
	const [orderTotal, setOrderTotal] = useState(0);
	const [message, setMessage] = useState("");
	const classes = useStyles();

	const cartTotal = Number(cart.reduce((total, item) => (total += item.price), 0).toFixed(2));

	const getDeliveryInfoFromPochta = (data) => {
		const { indexTo, cashOfDelivery, cityTo, addressTo } = data;

		const divsWithDeliveryResultClass = document.querySelectorAll(".delivery-result");
		const deliveryResultDiv = document.querySelector("#delivery-result");

		divsWithDeliveryResultClass.forEach((item) => item.classList.remove("delivery-result-fadein"));

		setDeliveryData(data);

		setTimeout(
			() => {
				setDeliveryAddress(
					<>
						пункт выдачи {indexTo}
						<br />
						<font style={{ color: "#f67e22" }}>
							{cityTo}, {addressTo}
						</font>
					</>
				);
				setDeliveryPrice(<>за {Number((cashOfDelivery / 100).toFixed(2))} ₽</>);
				setOrderTotal(<>Итого {Number((cartTotal + cashOfDelivery / 100).toFixed(2))} ₽</>);
				divsWithDeliveryResultClass.forEach((item) => item.classList.add("delivery-result-fadein"));
			},
			deliveryResultDiv.innerHTML === "<br>" ? 0 : 500
		);

		document.querySelector("#register-order-button").scrollIntoView({ behavior: "smooth", block: "end" });
	};

	useEffect(() => {
		ecomStartWidget({
			// id: 448,   // localhost
			// id: 457,   // gcloud
			id: window.location.href.match("localhost") ? 448 : 457,
			callbackFunction: getDeliveryInfoFromPochta,
			containerId: "ecom-widget",
		});
	}, []);

	const handleRegisterNewOrderClick = async () => {
		const result = await registerNewOrder(
			{
				userID: (context.user && context.user.id) || undefined,
				listOfProducts: cart,
				delivery: deliveryData,
				total: Number((cartTotal + deliveryData.cashOfDelivery / 100).toFixed(2)),
			},
			context
		);

		if (result.status !== 0) {
			setMessage(messages[`${result.status}`]);
		}

		if (result.status === 0) {
			history.push({
				pathname: "/orderRegistered",
				state: {
					orderID: result.orderID,
				},
			});
		}
	};

	const canOrder = (productsInCart, deliveryData) => {
		return productsInCart > 0 && deliveryData !== "" ? true : false;
	};

	const registerButtonProps = {
		classes: {
			root: classes.root,
			label: classes.label,
			disabled: canOrder(cart.length, deliveryData) ? "" : classes.disabled,
		},
		disabled: canOrder(cart.length, deliveryData) ? false : true,
		id: "register-order-button",
		onClick: canOrder(cart.length, deliveryData) ? handleRegisterNewOrderClick : undefined,
	};

	return (
		<div className="checkout">
			<div style={{ placeSelf: "center", margin: "30px" }}>
				<font style={{ color: "#f67e22" }}>Доставить&nbsp;</font>
				ваш заказ на сумму {cartTotal} ₽&nbsp;
				<font style={{ color: "#f67e22" }}>в</font>
			</div>
			<div id="ecom-widget" style={{ height: "500px", width: "100%", placeContent: "center" }} />
			<div id="delivery-result" className="delivery-result">
				{deliveryAddress}
				<br />
				{deliveryPrice}
			</div>
			<div className="delivery-result">{orderTotal}</div>
			<div style={{ marginTop: "30px" }}>{message}</div>
			<div style={{ placeSelf: "center", margin: "30px" }}>
				<Button {...registerButtonProps}>ЗАКАЗАТЬ</Button>
			</div>
		</div>
	);
};

export default Checkout;

const messages = {
	"1": (
		<div className="message">
			Не удалось создать заказ
			<br />
			Жаловаться сюда:&nbsp;
			<a href="mailto:info-corona@mail.ru">почта для жалований</a>
		</div>
	),
};

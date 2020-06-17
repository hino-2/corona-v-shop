import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { GeneralContext } from "../GeneralContext";
import { getListOfExistingOrders } from "../../logic/orderManagement";
import "./style.scss";

const useStyles = makeStyles({
	root: {
		background: "#df641a",
		borderRadius: 3,
		border: 0,
		color: "white",
		height: 50,
		width: "100%",
		lineHeight: "normal",
		padding: "0 20px",
		minWidth: "100px",
		marginTop: "10px",
		"&:hover": {
			backgroundColor: "#cc9a00",
		},
	},
});

const LK = () => {
	const context = useContext(GeneralContext);

	const userID = context.user && context.user.id;

	const [listOfOrders, setListOfOrders] = useState([]);
	const [message, setMessage] = useState("");
	const classes = useStyles();

	useEffect(() => {
		(async function () {
			const result = await getListOfExistingOrders(userID);
			if (result.status !== 0) {
				setMessage(messages[1]);
				return;
			}

			if (result.status === 0) setListOfOrders(result.listOfOrders);
		})();
	}, [userID]);

	return (
		<div style={{ display: "block" }}>
			<Link to={"/addMoney"} style={{ textDecoration: "none" }}>
				<Button
					classes={{
						root: classes.root,
						label: classes.label,
					}}>
					ПОПОЛНИТЬ СЧЁТ
				</Button>
			</Link>
			{listOfOrders.map(({ orderID, total, delivery: { cityTo, addressTo } }) => (
				<Link to={`/order/${orderID}`} style={{ textDecoration: "none" }} key={`${orderID}`}>
					<div className="lk-item">
						<div>{total} ₽</div>
						<div className="order-info">
							<div>
								<font style={{ color: "#f67e22" }}>{orderID}</font>
							</div>
							<div>{cityTo}</div>
							<div>{addressTo}</div>
						</div>
					</div>
				</Link>
			))}
			<div style={{ marginTop: "30px" }}>{message}</div>
		</div>
	);
};

export default LK;

const messages = {
	"1": (
		<div className="message">
			Не удалось получить список заказов
			<br />
			Жаловаться сюда:&nbsp;
			<a href="mailto:info-corona@mail.ru">почта для жалований</a>
		</div>
	),
};

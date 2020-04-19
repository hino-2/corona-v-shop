import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GeneralContext } from "../GeneralContext";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";

const useStyles = makeStyles({
	root: {
		fontFamily: "Montserrat, sans-serif",
		fontSize: "22px",
		// background: 'radial-gradient(farthest-corner at 40px 190px, #f2c12a, #df641a)',
		background: "#df641a",
		borderRadius: 3,
		border: 0,
		color: "white",
		height: 30,
		width: 80,
		lineHeight: "normal",
		padding: "0 5px",
		transition: "0.3s all",
		"&:hover": {
			transform: "scale(1.2)",
			backgroundColor: "#df641a",
			transition: "0.3s all",
		},
	},
	label: {
		textTransform: "capitalize",
	},
});

const CartItem = ({ data }) => {
	const { id, category, name, photo, price, desc, ...other } = data;
	const context = useContext(GeneralContext);

	const classes = useStyles();

	return (
		<div className="cart-item">
			<div style={{ display: "flex", maxHeight: "inherit" }}>
				<Link
					to={`/product/${name}`}
					style={{ textDecoration: "none", color: "white", maxHeight: "inherit" }}>
					<img src={photo} alt="Фото" />
				</Link>
			</div>
			<div>
				<Link
					to={`/product/${name}`}
					style={{ textDecoration: "none", color: "white" }}>
					{name}
				</Link>
			</div>
			<div>
				<Link
					to={`/${name}`}
					style={{ textDecoration: "none", color: "white" }}>
					{price} ₽
				</Link>
			</div>
			<div>
				<Button
					classes={{
						root: classes.root,
						label: classes.label,
					}}
					onClick={() => context.removeProductFromCart(id)}>
					-
				</Button>
			</div>
			<div>
				<Button
					classes={{
						root: classes.root,
						label: classes.label,
					}}
					onClick={() => context.addProductsToCart(data)}>
					+
				</Button>
			</div>
		</div>
	);
};

export default CartItem;

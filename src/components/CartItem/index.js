import React, { useContext } from "react";
import { Link } 			 from "react-router-dom";
import { GeneralContext } 	 from "../GeneralContext";
import Button 				 from "@material-ui/core/Button";
import { makeStyles } 		 from "@material-ui/core/styles";
import { Image, 
		 Transformation }    from 'cloudinary-react';
import "./style.scss";

const useStyles = makeStyles({
	root: {
		fontFamily: "Montserrat, sans-serif",
		fontSize: "22px",
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
	const { id, name, photo, price } = data;
	const context = useContext(GeneralContext);

	const classes = useStyles();

	return (
		<div className="cart-item">
			<div style={{ display: "flex", maxHeight: "inherit" }}>
				<Link
					to={`/product/${name}`}
					style={{ textDecoration: "none", color: "white", maxHeight: "inherit" }}>
					<Image cloudName="hino-2" publicId={`v1/corona-v-shop/${photo.replace('/img/', '')}`}>
                    	<Transformation height="100" quality="auto:low" crop="scale" />
               	 	</Image>
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
					onClick={() => context.addProductToCart(data)}>
					+
				</Button>
			</div>
		</div>
	);
};

export default CartItem;

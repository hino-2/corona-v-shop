import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GeneralContext } from "../GeneralContext";
import uniqid from "uniqid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Image, Transformation } from "cloudinary-react";
import { isMobile } from "../../utils";
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

const ProductDetail = ({ match }) => {
	const context = useContext(GeneralContext);
	const product = context.products.find((item) => item.name === match.params.name);
	const { id, category, name, photo, price, desc, _id, ...other } = product;
	const classes = useStyles();

	return (
		<div className="product-details" key={uniqid()}>
			<div style={{ textAlign: "center", gridColumn: "1/4" }}>
				<font style={{ fontSize: "32px", color: "white" }}>{name}</font>
			</div>
			<div style={{ minHeight: "250px", textAlign: "center", padding: "0", minWidth: "100%", gridColumn: "1/4" }}>
				<Image cloudName="hino-2" publicId={`v1/corona-v-shop/${photo.replace("/img/", "")}`}>
					{isMobile() ? (
						<Transformation height="300" width="400" quality="auto:low" crop="fit" />
					) : (
						<Transformation height="500" width="700" quality="auto:low" crop="fit" />
					)}
				</Image>
			</div>
			<div style={{ textAlign: "left", gridColumn: "1/3" }}>Цена</div>
			<div style={{ textAlign: "right", fontWeight: "bold" }}>{price} ₽</div>
			<div style={{ gridColumn: "1/3" }}>{Object.keys(other)[0]}</div>
			<div style={{ justifySelf: "end" }}>{other[Object.keys(other)[0]]}</div>
			<div style={{ fontSize: "16px", gridColumn: "1/4" }}>{desc}</div>
			<div style={{ justifySelf: "start", marginLeft: "20px" }}>
				<Button
					classes={{
						root: classes.root,
						label: classes.label,
					}}
					onClick={() => context.removeProductFromCart(id)}>
					-
				</Button>
			</div>
			<div style={{ placeSelf: "center", display: "table" }}>
				<div style={{ display: "table-cell", verticalAlign: "middle" }}>
					<Link to={"/cart"}>
						<Image cloudName="hino-2" publicId={`v1/corona-v-shop/cart.png`}>
							<Transformation height="28" quality="auto:low" crop="scale" />
						</Image>
					</Link>
				</div>
				<div style={{ display: "table-cell", verticalAlign: "middle" }}>
					{context.cart.filter((item) => item.name === match.params.name).length}
				</div>
			</div>
			<div style={{ justifySelf: "end", marginRight: "20px" }}>
				<Button
					classes={{
						root: classes.root,
						label: classes.label,
					}}
					onClick={() => context.addProductToCart(product)}>
					+
				</Button>
			</div>
		</div>
	);
};

export default ProductDetail;

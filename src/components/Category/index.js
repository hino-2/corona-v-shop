import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { GeneralContext } from "../GeneralContext";
import { fetchProductsByParams } from "../../utils";

const useStyles = makeStyles({
	root: {
		fontFamily: "Montserrat, sans-serif",
		borderRadius: 3,
		border: 0,
		color: "white",
		height: 48,
		width: "100%",
		lineHeight: "normal",
		padding: "0 20px",
		minWidth: "100px",
	},
	label: {
		textTransform: "capitalize",
	},
});

const Category = ({ name }) => {
	const classes = useStyles();
	const context = useContext(GeneralContext);

	const handleCategoryClick = async () => {
		const products = await fetchProductsByParams(name);
		const productsAmount = await fetchProductsAmountInCategory(name);
		context.setProducts(products);
		context.setProductsAmount(productsAmount);
	};

	return (
		<Button
			classes={{
				root: classes.root,
				label: classes.label,
			}}
			onClick={handleCategoryClick}>
			{name}
		</Button>
	);
};

export default Category;

const fetchProductsAmountInCategory = async (category) => {
	const response = await fetch(`/productsAmount/${category}`, {
		headers: {
			Accept: "application/json",
		},
	});
	const productsTotalAmount = await response.json();

	return productsTotalAmount;
};

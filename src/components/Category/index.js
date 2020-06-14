import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { GeneralContext } from "../GeneralContext";
import { isMobile } from "../../utils";

const useStyles = makeStyles({
	root: {
		fontFamily: "Montserrat, sans-serif",
		borderRadius: 3,
		border: 0,
		color: "white",
		height: isMobile() ? 28 : 48,
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

	const handleCategoryClick = () => {
		context.changeCategory(name);
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

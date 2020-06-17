import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Category from "../Category";
import { GeneralContext } from "../GeneralContext";
import "./style.scss";

const CategoryBar = () => {
	const categories = useContext(GeneralContext).categories;

	return (
		<div className="category-bar">
			{categories.map((item) => (
				<div key={`cat${item._id}`}>
					<Link to={`/category/${item.name}`} style={{ textDecoration: "none" }}>
						<Category name={item.name} />
					</Link>
				</div>
			))}
		</div>
	);
};

export default CategoryBar;

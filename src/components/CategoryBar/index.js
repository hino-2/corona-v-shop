import React from "react";
import { Link } from "react-router-dom";
import Category from "../Category";
import "./style.scss";

const CategoryBar = ({ categories = [] }) => (
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

export default React.memo(CategoryBar);

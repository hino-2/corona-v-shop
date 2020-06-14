import React from "react";
import CategoryBar from "../CategoryBar";
import ProductList from "../ProductList";
import Pages from "../Pages";
import Search from "../Search";
import "./style.scss";

const Shop = ({ match }) => (
	<>
		<CategoryBar />
		<ProductList category={match.params.category} />
		<div className="footer">
			<Search />
			<Pages category={match.params.category} namemask={match.params.namemask} />
		</div>
	</>
);

export default Shop;

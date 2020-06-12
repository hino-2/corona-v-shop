import React from "react";
import CategoryBar from "../CategoryBar";
import ProductList from "../ProductList";
import Pages from "../Pages";

const Shop = ({ match }) => (
	<>
		<CategoryBar />
		<ProductList category={match.params.category} />
		<Pages category={match.params.category} />
	</>
);

export default Shop;

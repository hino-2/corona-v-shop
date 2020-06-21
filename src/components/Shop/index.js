import React, { useContext } from "react";
import { GeneralContext } from "../GeneralContext";
import CategoryBar from "../CategoryBar";
import ProductList from "../ProductList";
import Pages from "../Pages";
import Search from "../Search";
import "./style.scss";

const Shop = ({ match }) => {
	const context = useContext(GeneralContext);

	return (
		<>
			<CategoryBar categories={context.categories} />
			<ProductList products={context.products} />
			<div className="footer">
				<Search />
				<Pages category={match.params.category} namemask={match.params.namemask} context={context} />
			</div>
		</>
	);
};
export default Shop;

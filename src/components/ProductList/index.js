import React, { useContext, useEffect } from "react";
import uniqid from "uniqid";
import { GeneralContext } from "../GeneralContext";
import Product from "../Product";
import LazyLoad from "react-lazyload";
import "./style.scss";

const ProductList = () => {
	const products = useContext(GeneralContext).products;

	return (
		<div className="product-list" key={uniqid()}>
			{products.map((item) => (
				<LazyLoad height={380} key={uniqid()}>
					<Product data={item} key={item._id} />
				</LazyLoad>
			))}
		</div>
	);
};

export default ProductList;

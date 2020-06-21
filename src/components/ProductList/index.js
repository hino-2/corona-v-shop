import React from "react";
import uniqid from "uniqid";
import Product from "../Product";
import LazyLoad from "react-lazyload";
import "./style.scss";

const ProductList = ({ products }) => (
	<div className="product-list" key={uniqid()}>
		{products.map((item) => (
			<LazyLoad height={380} key={uniqid()}>
				<Product data={item} key={item._id} />
			</LazyLoad>
		))}
	</div>
);

export default React.memo(ProductList);

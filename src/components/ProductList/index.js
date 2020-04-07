import React, { useContext }  from 'react';
import uniqid from "uniqid";
import { ProductsContext } from '../ProductsContext';
import Product from "../Product";
import './style.scss';

const ProductList = () => {
    const products = useContext(ProductsContext).products;

    return (
        <div className="product-list">
            {products.map((item) => <Product data={item} key={uniqid()} />)}
        </div>
    );
}

export default ProductList;
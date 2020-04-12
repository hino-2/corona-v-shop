import React, { useContext }  from 'react';
import uniqid from "uniqid";
import { ProductsContext } from '../ProductsContext';
import Product from "../Product";
import './style.scss';

const ProductList = ({ category }) => {
    const [context, setContext] = useContext(ProductsContext);
    const products = context.products;

    return (
        <div className="product-list">
            {products.filter((item) => item.category === category || category === undefined)
                     .map((item) => <Product data={item} key={uniqid()} />)}
        </div>
    );
}

export default ProductList;
import React, { useContext }  from 'react';
import uniqid                 from "uniqid";
import { GeneralContext }     from '../GeneralContext';
import Product                from "../Product";
import './style.scss';

const ProductList = ({ category }) => {
    const products = useContext(GeneralContext).products;

    return (
        <div className="product-list">
            {products.filter((item) => item.category === category || category === undefined)
                     .map   ((item) => <Product data={item} key={uniqid()} />)}
        </div>
    );
}

export default ProductList;
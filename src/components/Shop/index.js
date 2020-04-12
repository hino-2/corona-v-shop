import React from 'react';
import CategoryBar from '../CategoryBar';
import ProductList from '../ProductList';

const Shop = ({ match }) => (
    <>
        <CategoryBar />
        <ProductList category={match.params.category}/> 
    </>
);

export default Shop;
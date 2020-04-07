import React, { useState, createContext } from 'react';
import productsJSON from './products.json';

export const ProductsContext = createContext();

export const ProductsProvider = (props) => {
    const addProductsToCart = (product) => {
        console.log('addProductsToCart', product);
    };

    const removeProductFromCart = (id) => {
        console.log('removeProductFromCart', id);
    };

    const [products, setProducts] = useState({
        products: productsJSON,
        cart: [],
        addProductsToCart: addProductsToCart,
        removeProductFromCart: removeProductFromCart
    });
    
    return (
        <ProductsContext.Provider value={products}>
            {props.children}
        </ProductsContext.Provider>
    );
}

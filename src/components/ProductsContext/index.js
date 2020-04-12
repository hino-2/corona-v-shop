import React, { useState, createContext } from 'react';
import productsJSON from './products.json';

export const ProductsContext = createContext();

export const ProductsProvider = (props) => {
    const addProductToCart = (product) => {
        setContext(prevContext => { 
            console.log([...prevContext.cart, product])
            return {
                products: productsJSON,
                cart: [...prevContext.cart, product],
                addProductsToCart: addProductToCart,
                removeProductFromCart: removeProductFromCart
            }
        });
    };

    const removeProductFromCart = (id) => {
        setContext(prevContext => { 
            const newCart = prevContext.cart;
            const deleteFrom = newCart.indexOf(newCart.find((item) => item.id === id));
            if(deleteFrom > -1)
                newCart.splice(deleteFrom, 1);

            return {
                products: productsJSON,
                cart: newCart,
                addProductsToCart: addProductToCart,
                removeProductFromCart: removeProductFromCart
            }
        });
    };

    const [context, setContext] = useState({
        products: productsJSON,
        cart: [],
        addProductsToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart
    });
    // console.log(context);
    
    return (
        <ProductsContext.Provider value={[context, setContext]}>
            {props.children}
        </ProductsContext.Provider>
    );
}

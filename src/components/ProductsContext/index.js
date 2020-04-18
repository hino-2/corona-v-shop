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
                user: prevContext.user,
                addProductsToCart: addProductToCart,
                removeProductFromCart: removeProductFromCart,
                setUser: setUser
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
                user: prevContext.user,
                addProductsToCart: addProductToCart,
                removeProductFromCart: removeProductFromCart,
                setUser: setUser
            }
        });
    };

    const setUser = (user) => {
        setContext(prevContext => {
            return {
                products: productsJSON,
                cart: prevContext.cart,
                user: user,
                addProductsToCart: addProductToCart,
                removeProductFromCart: removeProductFromCart,
                setUser: setUser
            }
        })
    }

    const [context, setContext] = useState({
        products: productsJSON,
        cart: [],
        user: {},
        addProductsToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart,
        setUser: setUser
    });
    // console.log(context);
    
    return (
        <ProductsContext.Provider value={context}>
            {props.children}
        </ProductsContext.Provider>
    );
}

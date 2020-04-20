import React, { useState, 
                createContext } from 'react';
import Cookies                  from 'universal-cookie';
import productsJSON             from './products.json';

export const GeneralContext = createContext();

export const ContextProvider = (props) => {
    const cookies = new Cookies();
    const [user, _setUser] = useState(cookies.get('user'));

    // TODO: сделать что-то с повторяющимися объектами ффс

    const addProductToCart = (product) => {
        setContext(prevContext => { 
            return {
                products: productsJSON,
                cart: [...prevContext.cart, product],
                user: prevContext.user,
                addProductsToCart: addProductToCart,
                removeProductFromCart: removeProductFromCart,
                emptyCart: emptyCart,
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
                emptyCart: emptyCart,
                setUser: setUser
            }
        });
    };

    const emptyCart = () => {
        setContext(prevContext => {
            return {
                products: productsJSON,
                cart: [],
                user: prevContext.user,
                addProductsToCart: addProductToCart,
                removeProductFromCart: removeProductFromCart,
                emptyCart: emptyCart,
                setUser: setUser
            }
        })
    }

    const setUser = (user) => {
        setContext(prevContext => {
            return {
                products: productsJSON,
                cart: prevContext.cart,
                user: user,
                addProductsToCart: addProductToCart,
                removeProductFromCart: removeProductFromCart,
                emptyCart: emptyCart,
                setUser: setUser
            }
        })
    }

    const [context, setContext] = useState({
        products: productsJSON,
        cart: [],
        user: user,
        addProductsToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart,
        emptyCart: emptyCart,
        setUser: setUser
    });
    
    return (
        <GeneralContext.Provider value={context}>
            {props.children}
        </GeneralContext.Provider>
    );
}

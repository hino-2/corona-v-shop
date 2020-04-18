import React, { useContext } from 'react';
import { ProductsContext } from '../ProductsContext'
import './style.scss';

const NavBarCart = () => {
    const context = useContext(ProductsContext);
    const cart = context.cart;
    // console.log(cart);
    
    return (
        <>
            <img src="/img/cart.png" 
                 style={{"height": "50px"}} 
                 alt="Корзина" />
            <div>
                <font>
                    {cart.length}
                </font>
            </div>
        </>
    );
}

export default NavBarCart;
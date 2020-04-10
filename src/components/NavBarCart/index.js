import React, { useContext } from 'react';
import { ProductsContext } from '../ProductsContext'
import './style.scss';

const NavBarCart = () => {
    const context = useContext(ProductsContext).cart;
    console.log(context);
    
    const showCart = () => {
        console.log('show cart');
        
    }

    return (
        <>
            <img src="/img/cart.png" 
                 onClick={showCart}
                 style={{"height": "50px"}} 
                 alt="Корзина" />
            <div>
                <font>
                    {context.length}
                </font>
            </div>
        </>
    );
}

export default NavBarCart;
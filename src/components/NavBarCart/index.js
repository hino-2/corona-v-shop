import React, { useContext } from 'react';
import { GeneralContext }    from '../GeneralContext'
import './style.scss';

const NavBarCart = () => {
    const cart = useContext(GeneralContext).cart;
    
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
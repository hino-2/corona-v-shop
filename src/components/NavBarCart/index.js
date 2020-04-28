import React, { useContext } from 'react';
import { GeneralContext }    from '../GeneralContext';
import { Image, 
         Transformation }    from 'cloudinary-react';
import './style.scss';

const NavBarCart = () => {
    const cart = useContext(GeneralContext).cart;
    
    return (
        <>
            <Image cloudName="hino-2" publicId={`v1/corona-v-shop/cart.png`}>
                <Transformation height="50" quality="auto:low" crop="scale" />
            </Image>
            <div>
                <font>
                    {cart.length}
                </font>
            </div>
        </>
    );
}

export default NavBarCart;
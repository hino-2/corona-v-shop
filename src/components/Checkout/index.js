import React, {useContext, useEffect, useState} from 'react';
import { ProductsContext } from '../ProductsContext';
import {ecomStartWidget} from './widget';
import './style.scss';

const Checkout = () => {
    const context = useContext(ProductsContext);
    // const [widget, setWidget] = useState();
    const cart = context.cart;
    const total = cart.reduce((total, item) => total += item.price, 0);
    
    // const widgetSrc = document.createElement('script');
    // widgetSrc.type  = "text/javascript";
    // widgetSrc.src   = "https://widget.pochta.ru/map/widget/widget.js";
    
    // const widgetBody = document.createElement('script');
    // widgetBody.innerHTML = `ecomStartWidget({
    //                             id: 409,
    //                             callbackFunction: getDeliveryInfoFromPochta,
    //                             containerId: 'ecom-widget'
    //                         });`;
    // const getDeliveryInfoFromPochta = document.createElement('script');
    // getDeliveryInfoFromPochta.innerHTML = `function getDeliveryInfoFromPochta(data) {
    //                                           console.log(data);
    //                                           document.getElementById('result').innerHTML = JSON.stringify(data, null, 4);
    //                                        }`;

    const getDeliveryInfoFromPochta = (data) => {
        console.log(data);
        document.getElementById('result').innerHTML = JSON.stringify(data, null, 4);
    }

    // useEffect(() => {
    //     document.getElementsByTagName('head')[0].appendChild(getDeliveryInfoFromPochta);
    //     // document.querySelector('#ecom-widget').appendChild(widgetSrc);
    //     document.querySelector('#ecom-widget').appendChild(widgetBody);
    // })

    useEffect(() => {
        ecomStartWidget({
            id: 409,
            callbackFunction: getDeliveryInfoFromPochta,
            containerId: 'ecom-widget'
        });
    },[]);

    return (
        <div className="checkout">
            <div>
                Доставка
            </div>
            <div id="ecom-widget" style={{height: "100%"}}>
               
            </div>
            <div id="result">
                &nbsp;
            </div>
            <div>
                {total} ₽
            </div>
        </div>
    );
}

export default Checkout;
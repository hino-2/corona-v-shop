import React, { useContext, useEffect, useState } from 'react';
import uniqid from 'uniqid';
import { GeneralContext } from '../GeneralContext';
import './style.scss'

const LK = () => {
    const context = useContext(GeneralContext);

    const userID = context.user && context.user.userID;

    const [listOfOrders, setListOfOrders] = useState([]);

    useEffect(() => {
        const getListOfExistingOrders = async () => {
            const responce = await fetch('/getOrders', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({userID: userID})
            });
            const listOfOrders = await responce.json();

            if(listOfOrders) 
                setListOfOrders(
                    listOfOrders.map(({orderID, total, delivery: {cityTo, addressTo}}) => 
                        <div className="lk-item" key={uniqid()}>
                            <div>
                                {total} ₽
                            </div>
                            <div> 
                                <font style={{color: "#f67e22"}}>
                                    {orderID}
                                </font>
                            </div> 
                            <div>
                                {cityTo}
                            </div>
                            <div>
                                {addressTo}
                            </div>
                        </div>
                ))
        }
        getListOfExistingOrders();
    }, [])

    return (
        <div style={{display: "block"}}>
            { listOfOrders }
        </div>
    );
}

export default LK;
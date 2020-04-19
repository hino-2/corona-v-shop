import React from 'react';

const OrderRegistered = (props) => {
    if(!props.history.location.state)
        return null;
    
    const {location: { state: { orderID } }} = props;

    return (
        <div style={{textAlign: "center", 
                    color: "white", 
                    fontSize: "48px", 
                    height: "600px",
                    marginTop: "50px"}}>
            Ваш заказ<br />
            №&nbsp;
            <font style={{color: "#f67e22"}}>
                { orderID }
            </font>
            &nbsp;(LOL)<br />
            отправлен нашему менеджеру<br />
            <br />
            Спасибо за покупку<br />
            Заходите к нам еще
        </div>
    )
}

export default OrderRegistered;
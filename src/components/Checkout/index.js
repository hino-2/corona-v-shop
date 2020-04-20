import React, {useContext, 
               useEffect, 
               useState}   from 'react';
import { useHistory }      from 'react-router-dom';
import Button              from '@material-ui/core/Button';
import { makeStyles }      from '@material-ui/core/styles';
import { GeneralContext }  from '../GeneralContext';
import { ecomStartWidget } from './widget';
import './style.scss';

const useStyles = makeStyles({
    root: {
    //   background: 'linear-gradient(270deg, #BE2E00 0%, #BA6400 100%);',
      background: '#df641a',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 50,
      width: 280,
      lineHeight: 'normal',
      padding: '0 20px',
      minWidth: '100px',
      transition: "0.3s all",
      '&$disabled': {
          background: 'rgba(0, 0, 0, 0.12)',
          color: 'white',
          boxShadow: 'none',
      },
      "&:hover": {
        transform: "scale(1.2)",
        backgroundColor: "#df641a",
        transition: "0.3s all",
    },
    },
    label: {
      textTransform: 'capitalize',
    },
    disabled: {
        background: "grey"
    }
});

const Checkout = () => {
    const context = useContext(GeneralContext);
    const history = useHistory();
    const cart    = context.cart;
        
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryPrice, setDeliveryPrice]     = useState('');
    const [deliveryData, setDeliveryData]       = useState('');
    const [total, setTotal]                     = useState('');
    const classes                               = useStyles();
    
    const getDeliveryInfoFromPochta = (data) => {
        const {indexTo, cashOfDelivery, cityTo, addressTo} = data;
        setDeliveryData(data);
        setDeliveryAddress(<>
            пункт выдачи {indexTo}<br />
            <font style={{color: "#f67e22"}}>
                {cityTo}, {addressTo}
            </font>
        </>);
        setDeliveryPrice(<>за {cashOfDelivery/100} ₽</>);
        setTotal(<>Итого {cart.reduce((total, item) => total += item.price, 0) + cashOfDelivery/100} ₽</>);
        document.querySelector('#delivery-result').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }

    const registerNewOrder = async (order) => {
        if(isNaN(order.total))
            return;

        const responce = await fetch('/registerOrder', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({order: order})
        });
        const result = await responce.json();

        if(result.orderID)
            context.emptyCart();
            history.push({
                pathname: '/orderRegistered',
                state: {
                    orderID: result.orderID
                }
            });
    }

    useEffect(() => {
        ecomStartWidget({
            id: 448,
            callbackFunction: getDeliveryInfoFromPochta,
            containerId: 'ecom-widget'
        });
    }, []);

    return (
        <div className="checkout">
            <div style={{placeSelf: "center", margin: "30px"}}>
                <font style={{color: "#f67e22"}}>
                    Доставить&nbsp;
                </font> 
                ваш заказ на сумму { cart.reduce((total, item) => total += item.price, 0) } ₽&nbsp;
                <font style={{color: "#f67e22"}}>
                    в
                </font>
            </div>
            <div id="ecom-widget" style={{height: "500px", width: "100%", placeContent: "center"}} />
            <div id="delivery-result" style={{textAlign: "center", marginTop: "20px"}}>
                { deliveryAddress }
                <br />
                { deliveryPrice }
            </div>
            <div style={{textAlign: "center", marginTop: "20px"}}>
                {total}
            </div>
            <div style={{placeSelf: "center", margin: "30px"}}>
                {(cart.length > 0 && deliveryData !== '') ? 
                    <Button
                        classes={{
                            root: classes.root,
                            label: classes.label,
                        }} 
                        onClick={() => registerNewOrder({
                            userID: (context.user && context.user.userID) || undefined, 
                            listOfProducts: cart, 
                            delivery: deliveryData,
                            total: cart.reduce((total, item) => total += item.price, 0) + deliveryData.cashOfDelivery/100
                        })}>
                        ЗАКАЗАТЬ
                    </Button>
                    : 
                    <Button
                        disabled
                        classes={{
                            root: classes.root,
                            label: classes.label,
                            disabled: classes.disabled
                        }}>
                        ЗАКАЗАТЬ
                    </Button>
                }
            </div>
        </div>
    );
}

export default Checkout;
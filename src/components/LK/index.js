import React, { useContext, 
                useEffect, 
                useState } from 'react';
import { Link }            from 'react-router-dom';
import uniqid              from 'uniqid';
import Button              from '@material-ui/core/Button';
import { makeStyles }      from '@material-ui/core/styles';
import { GeneralContext }  from '../GeneralContext';
import './style.scss'

const useStyles = makeStyles({
    root: {
      background: '#df641a',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 50,
      width: '100%',
      lineHeight: 'normal',
      padding: '0 20px',
      minWidth: '100px',
      marginTop: '10px',
      "&:hover": {
        backgroundColor: "#cc9a00",
      }
    }
});

const LK = () => {
    const context = useContext(GeneralContext);

    const userID = context.user && context.user.userID;

    const [listOfOrders, setListOfOrders] = useState([]);
    const classes                         = useStyles();

    useEffect(() => {
        const getListOfExistingOrders = async () => {
            const response = await fetch('/getOrders', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({userID: userID})
            });
            if(response.status !== 200) {
                setListOfOrders(<>
                    <div className="message">
                        Не удалось получить список заказов<br />
                        Жаловаться сюда:&nbsp;
                            <a href='mailto:info-corona@mail.ru'>почта для жалований</a>
                    </div>                
                </>);
                return;
            }
            const listOfOrders = await response.json();

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
            <Link to={'/addMoney'} style={{textDecoration: "none"}}>
                <Button
                    classes={{
                        root: classes.root,
                        label: classes.label,
                    }}>
                    ПОПОЛНИТЬ СЧЁТ
                </Button>
            </Link>
            { listOfOrders }
        </div>
    );
}

export default LK;
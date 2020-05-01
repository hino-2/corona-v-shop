import React, { useContext,
                useState }   from 'react';
import { Link, useHistory }  from "react-router-dom";
import Cookies               from 'universal-cookie';
import Button                from '@material-ui/core/Button';
import { makeStyles }        from '@material-ui/core/styles';
import { GeneralContext }    from '../GeneralContext';
import './style.scss';

const useStyles = makeStyles({
    root: {
        marginTop: "100px",
        background: '#df641a',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 50,
        width: '100%',
        lineHeight: 'normal',
        padding: '0 20px',
        minWidth: '100px',
        "&:hover": {
            backgroundColor: "#cc9a00",
        }
    }
});

const AddMoney = () => {
    const classes = useStyles();
    const history = useHistory();
    const context = useContext(GeneralContext);
    const [message, setMessage] = useState();

    const thereIsALoggedInUser = () => {
        if(!context.user || Object.keys(context.user).length === 0)
            return false;

        return true;
    }

    if(!thereIsALoggedInUser()) {
        return (
            <Link to="/login" style={{textDecoration: "none"}}>
                <Button
                    classes={{
                        root: classes.root,
                        label: classes.label,
                    }}>
                    Войти
                </Button>
            </Link>
        );
    }

    const formatCardNumber = (e) => {
        if(e.keyCode === 8) return;

        const cardInputElem = document.querySelector('#card-num');
        let formattedCardNumber = '';

        cardInputElem.value
            .split('')
            .filter(item => item !== ' ')
            .forEach((item, index) => {
                (index + 1) % 4 === 0 ? 
                    formattedCardNumber += item + ' ' :
                    formattedCardNumber += item;
        });

        cardInputElem.value = formattedCardNumber.replace(/\s$/, '').replace(/[A-Z]/gi, '').slice(0, 19);
    }

    const formatCardDate = (e) => {
        if(e.keyCode === 8) return;

        const cardInputElem = document.querySelector('#card-date');
        let formattedCardDate = '';

        cardInputElem.value
            .split('')
            .filter(item => item !== '/')
            .forEach((item, index) => {
                (index + 1) % 2 === 0 ? 
                    formattedCardDate += item + '/' :
                    formattedCardDate += item;
        });

        cardInputElem.value = formattedCardDate.replace(/\/$/, '').replace(/[A-Z]/gi, '').slice(0, 5);
    }

    const addMoneyToAccount = async () => {
        const amountToAdd = document.querySelector('#summa').value;
        const cardNumber  = document.querySelector('#card-num').value;
        const cardDate    = document.querySelector('#card-date').value;
        const cardCVC     = document.querySelector('#card-cvc').value;

        if(isNaN(amountToAdd) || 
           amountToAdd === 0 || 
           !cardNumber || 
           cardNumber.length !== 19 ||
           !cardDate || 
           cardDate.length !== 5 ||
           !cardCVC ||
           cardCVC.length !== 3) 
           return;

        const response = await fetch('/addMoney', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                userID: context.user.userID, 
                amount: amountToAdd,
                cardInfo: {
                    cardNumber: cardNumber,
                    cardDate: cardDate,
                    cardCVC: cardCVC
                }
            })
        });

        if(response.status !== 200) {
            setMessage(<>
                <div className="message">
                    Не удалось пополнить счет<br />
                    Жаловаться сюда:&nbsp;
                        <a href='mailto:info-corona@mail.ru'>почта для жалований</a>
                </div>                
            </>);
            return;           
        }

        const result = await response.json();
        if(result.result === 'money added') {
            setMessage(
                <div className="message">
                    Добавили {amountToAdd} ₽ вам на счет<br />
                    Возвращаем в магазин
                </div>            
            );

            const updatedUserInfo = {
                userID: context.user.userID,
                username: context.user.username,
                saldo: context.user.saldo += parseInt(amountToAdd)
            };
            const cookie = new Cookies();
            cookie.set('user', updatedUserInfo, {path: "/", maxAge: 3600});            
            context.setUser(updatedUserInfo);

            setTimeout(() => {
                if(history.location.pathname !== '/')
                    history.push('/');
            }, 3000);
        }
    }

    return (
        <div className="addmoney-container">
            <div className="card-info">
                <div className="card-number">
                    <div className="form__group field">
                        <input type="input" 
                                className="form__field" 
                                placeholder="Номер карты" 
                                id="card-num" 
                                autoComplete="false" 
                                maxLength="19"
                                onKeyUp={(e) => formatCardNumber(e)}
                                required />
                        <label htmlFor="card-num" className="form__label">Номер карты</label>
                    </div>
                </div>
                <div className="card-date">
                    <div className="form__group field">
                        <input type="input" 
                                className="form__field" 
                                placeholder="ММ/ГГ" 
                                id="card-date" 
                                autoComplete="false" 
                                maxLength="5"
                                onKeyUp={(e) => formatCardDate(e)}
                                required />
                        <label htmlFor="card-date" className="form__label">ММ/ГГ</label>
                    </div>
                </div>
                <div className="card-cvc">
                    <div className="form__group field">
                        <input type="input" 
                                className="form__field" 
                                placeholder="CVC" 
                                id="card-cvc" 
                                autoComplete="false" 
                                maxLength="3"
                                required />
                        <label htmlFor="card-cvc" className="form__label">CVC</label>
                    </div>
                </div>
            </div>
            <div>
                <div className="form__group field" style={{width: "100%"}}>
                    <input type="input" 
                            className="form__field" 
                            style={{fontSize: "62px"}}
                            placeholder="Сумма" 
                            id="summa" 
                            autoComplete="false" 
                            required />
                    <label htmlFor="summa" className="form__label-sum">Сумма</label>
                </div>
            </div>
            <Button
                classes={{
                    root: classes.root,
                    label: classes.label,
                }}
                onClick={() => {addMoneyToAccount()}}>
                ПОПОЛНИТЬ
            </Button>
            { message }
        </div>
    );
}

export default AddMoney;
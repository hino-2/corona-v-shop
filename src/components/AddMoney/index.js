import React, { useContext } from 'react';
import { Link }              from "react-router-dom";
import Button                from '@material-ui/core/Button';
import { makeStyles }        from '@material-ui/core/styles';
import { GeneralContext }    from '../GeneralContext';
import './style.scss';

const useStyles = makeStyles({
    root: {
        marginTop: "150px",
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
    const context = useContext(GeneralContext);

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

        cardInputElem.value = formattedCardNumber.replace(/\s$/, '').replace(/[A-Z]/gi, '');
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

        cardInputElem.value = formattedCardDate.replace(/\/$/, '').replace(/[A-Z]/gi, '');
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
                }}>
                ПОПОЛНИТЬ
            </Button>
        </div>
    );
}

export default AddMoney;
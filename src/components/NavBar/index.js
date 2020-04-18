import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import NavBarCart from '../NavBarCart';
import './style.scss';
import { ProductsContext } from '../ProductsContext';

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(270deg, #BE2E00 0%, #BA6400 100%);',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      lineHeight: 'normal',
      padding: '0 20px',
      minWidth: '100px'
    //   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
      textTransform: 'capitalize',
    },
});

const NavBar = () => {
    const title = <font color="#EA7E00" style={{"fontSize": "26px"}}>KORONA VI RUS SHOP</font>;
    const subtitle = <font color="white" style={{"fontSize": "20px"}}>Шестой русский магазин КОРОНА</font>;
    const context                 = useContext(ProductsContext);
    const [username, setUsername] = useState('друг');
    const [saldo, setSaldo]       = useState('');

    const classes = useStyles();

    useEffect(() => {
        if(!context.user.username) {
            setUsername('друг');
            return;
        }

        setUsername(context.user.username);
    }, [context.user.username]);
    
    useEffect(() => {
        if(!context.user.saldo) {
            setSaldo('');
            return;
        }

        setSaldo(
            <font style={{color: "white", fontSize:"12px"}}> 
                {`Счёт: ${context.user.saldo} ₽`} 
            </font>
        );
    }, [context.user.saldo]);

    return(
        <div className="navbar">
            <div className="title">
                <div>{title}</div>
                <div>{subtitle}</div>
            </div>
            <div className="logo">
                <Link to="/">
                    <img src="/logo.png" style={{"height": "60px"}} alt="CORONA V SHOP" />
                </Link>
            </div>
            <div className="navbarcart">
                <Link to='/cart' style={{"textDecoration": "none"}}>
                    <NavBarCart />
                </Link>
            </div>
            <div className="greetings">
                Привет, {username}.
            </div>
            <div className="account">
                <Link to={ saldo === '' ? '/login' : '/logout' } style={{"textDecoration": "none"}}>
                    <Button classes={{
                        root: classes.root,
                        label: classes.label,
                    }}>
                        { saldo === '' ? 'Вход' : 'Выход' }
                    </Button>
                </Link>
                { saldo }
            </div>
        </div>
    )
}

export default NavBar;
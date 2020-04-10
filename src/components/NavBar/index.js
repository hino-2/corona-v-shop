import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import NavBarCart from '../NavBarCart';
import './style.scss';

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(270deg, #BA6400 0%, #BE2E00 100%);',
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
    const [username, setUsername] = useState('друг');

    // const context = useContext(ProductsContext);

    const classes = useStyles();

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
                <Button classes={{
                    root: classes.root,
                    label: classes.label,
                }}>
                    Вход
                </Button>
            </div>
        </div>
    )
}

export default NavBar;